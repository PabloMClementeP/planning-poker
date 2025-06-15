import { useCallback, useEffect, useState } from "react";
import {
  POKER_VALUES,
  type PokerCardValue,
  type User,
  type Vote,
} from "../../../types";
import { db } from "../../../firebase/firebaseConfig";
import {
  get,
  onDisconnect,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";
import { toast } from "react-toastify";
import { TopicSection } from "./sections/topic-section";
import VotingSection from "./sections/voting-section";
import ResultsSection from "./sections/results-sections";
import UserList from "./sections/user-list";
import {
  FirstGridItem,
  GridWrapper,
  RoomWrapper,
  SecondGridItem,
  Section,
} from "./room-client-style";
import { Button } from "./styles/card";

interface RoomClientProps {
  roomId: string;
}

const getLocalUserId = (): string => {
  if (typeof window !== "undefined") {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      console.log("Generating new user ID");

      userId = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userId", userId);
    }
    return userId;
  }
  return "server_user_id_fallback";
};

const getLocalUserName = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userName") || "Anonymous";
  }
  return "AnonymousFallback";
};

const getLocalAvatar = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("avatar");
  }
  return "AnonymousFallback";
};
const RoomClient = ({ roomId }: RoomClientProps) => {
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [votes, setVotes] = useState<Record<string, Vote>>({});
  const [votesRevealed, setVotesRevealed] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  const usersRef = ref(db, `rooms/${roomId}/users`);
  const votesRef = ref(db, `rooms/${roomId}/votes`);
  const topicRef = ref(db, `rooms/${roomId}/currentTopic`);
  const votesRevealedRef = ref(db, `rooms/${roomId}/votesRevealed`);
  const hostIdRef = ref(db, `rooms/${roomId}/hostId`);

  useEffect(() => {
    setIsMounted(true);

    const userId = getLocalUserId();
    const userName = getLocalUserName();
    const avatar = getLocalAvatar() || "1";
    const userPresenceRef = ref(db, `rooms/${roomId}/users/${userId}`);
    const roomRef = ref(db, `rooms/${roomId}`);

    get(hostIdRef).then(async (snapshot) => {
      const hostIdInDB = snapshot.val();
      if (!hostIdInDB) {
        // Si no hay host, este usuario se convierte en host
        await set(hostIdRef, userId);
      }
      const isUserHost = hostIdInDB === userId;

      const userObj: User = {
        id: userId,
        name: userName,
        avatar,
        hasVoted: false,
        isOnline: true,
        isHost: isUserHost,
      };

      setCurrentUser(userObj);
      set(userPresenceRef, userObj);
      setIsHost(isUserHost);

      // Eliminar al usuario de la sala al desconectarse
      onDisconnect(userPresenceRef).remove();

      if (isUserHost) {
        // Escuchar si quedan usuarios online, y si no, eliminar la sala
        onValue(usersRef, (snapshot) => {
          const users = snapshot.val() || {};
          const onlineUsers = Object.values(users).filter(
            (u: any) => u.isOnline
          );

          if (onlineUsers.length <= 1) {
            // El host es el único conectado. Programamos borrar la sala al desconectarse
            onDisconnect(roomRef).remove();
          }
        });
      }
    });

    // Limpieza al desmontar
    return () => {
      update(userPresenceRef, { isOnline: false });
    };
  }, [roomId]);

  useEffect(() => {
    if (!isMounted || !currentUser) return;

    const onUsersChange = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const activeUsers = Object.values(usersData).filter(
          (u: any) => u.isOnline
        ) as User[];

        const updatedUsers = activeUsers.map((user: User) => {
          if (user.id === currentUser.id) {
            return { ...user, isHost: isHost };
          }
          return user;
        });
        setUsers(updatedUsers);
      } else {
        setUsers([]);
      }
    });

    const onVotesChange = onValue(votesRef, (snapshot) => {
      setVotes(snapshot.val() || {});
    });

    const onTopicChange = onValue(topicRef, (snapshot) => {
      console.log("Topic changed:", snapshot.val());

      setCurrentTopic(snapshot.val() || "");
    });

    const onVotesRevealedChange = onValue(votesRevealedRef, (snapshot) => {
      setVotesRevealed(snapshot.val() || false);
    });

    const onHostChange = onValue(hostIdRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsHost(snapshot.val() === currentUser?.id);
      }
    });

    return () => {
      onUsersChange();
      onVotesChange();
      onTopicChange();
      onVotesRevealedChange();
      onHostChange();
    };
  }, [isMounted, currentUser, roomId, isHost]);

  const handleSetTopic = useCallback(
    async (topic: string) => {
      console.log(isHost);

      if (!isHost) {
        toast.error("Tu no eres el Host de la reunión.");
        return;
      }

      await set(topicRef, topic);
      await set(votesRevealedRef, false);
      await set(votesRef, null);

      // Reset votes for all users
      const usersSnapshot = await get(usersRef);
      if (usersSnapshot.exists()) {
        const updates: Record<string, any> = {};
        Object.keys(usersSnapshot.val()).forEach((userId) => {
          updates[`/${userId}/hasVoted`] = false;
        });
        await update(usersRef, updates);
      }
    },
    [isHost, topicRef, votesRef, votesRevealedRef, usersRef]
  );

  const handleVote = useCallback(
    async (value: PokerCardValue) => {
      if (!currentUser) return;
      if (votesRevealed) {
        toast.error(
          "No puedes votar después de que los votos han sido revelados."
        );
        return;
      }

      const userVoteRef = ref(db, `rooms/${roomId}/votes/${currentUser.id}`);
      await set(userVoteRef, { userId: currentUser.id, value });

      const userSelfRef = ref(db, `rooms/${roomId}/users/${currentUser.id}`);
      await update(userSelfRef, { hasVoted: true });

      toast.info(
        "Voto emitido correctamente - espera a que el anfitrión revele los votos."
      );
    },
    [currentUser, votesRevealed, toast, roomId]
  );

  const handleRevealVotes = useCallback(async () => {
    if (!isHost) {
      toast.error("Solo el anfitrión puede revelar los votos.");
      return;
    }
    const currentVotesSnapshot = await get(votesRef);
    if (
      !currentVotesSnapshot.exists() ||
      Object.keys(currentVotesSnapshot.val()).length === 0
    ) {
      toast.error("No hay votos para revelar.");
      return;
    }
    await set(votesRevealedRef, true);
    toast.info("Los votos han sido revelados. Puedes ver los resultados.");

    const numericEstimates = Object.values(
      currentVotesSnapshot.val() as Record<string, Vote>
    )
      .map((v) => v.value)
      .filter(
        (v) =>
          typeof v === "number" || (typeof v === "string" && !isNaN(Number(v)))
      )
      .map((v) => Number(v));

    if (numericEstimates.length > 0 && currentTopic) {
      const average = (
        numericEstimates.reduce((sum, value) => sum + value, 0) /
        numericEstimates.length
      ).toFixed(2);
      toast.info(`Estimación promedio: ${average}`);
    }
  }, [isHost, currentTopic, toast, votesRef, votesRevealedRef]);

  const handleResetSession = useCallback(async () => {
    if (!isHost) {
      toast.error("Solo el anfitrión puede reiniciar la sesión.");
      return;
    }
    await set(votesRef, null);
    await set(votesRevealedRef, false);
    await set(topicRef, null);

    const usersSnapshot = await get(usersRef);
    if (usersSnapshot.exists()) {
      const updates: Record<string, any> = {};
      Object.keys(usersSnapshot.val()).forEach((userId) => {
        updates[`/${userId}/hasVoted`] = false;
      });
      await update(usersRef, updates);
    }
    toast.info(
      "Sesión reiniciada. Puedes establecer un nuevo tema y comenzar a votar de nuevo."
    );
  }, [isHost, toast, votesRef, votesRevealedRef, usersRef]);

  const userVoteValue = currentUser ? votes[currentUser.id]?.value : undefined;

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <RoomWrapper>
      <GridWrapper>
        <FirstGridItem>
          {!votesRevealed && (
            <Section>
              <TopicSection
                currentTopic={currentTopic}
                onSetTopic={handleSetTopic}
                isHost={isHost}
              />
            </Section>
          )}

          <Section id="votes-section">
            {votesRevealed ? (
              <section id="results-section">
                <ResultsSection votes={votes} users={users} />
              </section>
            ) : currentTopic ? (
              <VotingSection
                values={POKER_VALUES}
                onVote={handleVote}
                selectedVote={userVoteValue}
                votesRevealed={votesRevealed}
              />
            ) : null}
          </Section>
        </FirstGridItem>

        <SecondGridItem>
          <Section id="users-section">
            {isHost && (
              <section
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <Button onClick={handleRevealVotes}>Revelar Votos</Button>
                <Button onClick={handleResetSession}>Reiniciar Sesión</Button>
              </section>
            )}
            <UserList
              users={users}
              votesRevealed={votesRevealed}
              votes={votes}
              currentUserId={currentUser?.id || ""}
            />
          </Section>
        </SecondGridItem>
      </GridWrapper>
    </RoomWrapper>
  );
};

export default RoomClient;
