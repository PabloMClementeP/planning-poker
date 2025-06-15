import type { User, Vote } from "../../../../types";
import Check from "../../../../ui/icons/check";
import Clock from "../../../../ui/icons/clock";
import { CircleStyle, UserItemStyle, UserListStyle } from "./user-list-style";

interface UserListProps {
  users: User[];
  votesRevealed: boolean;
  votes: Record<string, Vote>;
  currentUserId: string;
}

const UserList = ({ users, votesRevealed, votes }: UserListProps) => {
  if (!users || users.length === 0)
    return <div>No hay usuarios en la sala.</div>;

  // 🔽 Ordenar: host primero, luego los que votaron
  const sortedUsers = [...users].sort((a, b) => {
    if (a.isHost && !b.isHost) return -1;
    if (!a.isHost && b.isHost) return 1;

    if (a.hasVoted && !b.hasVoted) return -1;
    if (!a.hasVoted && b.hasVoted) return 1;

    return 0;
  });

  console.log(users);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Participantes</h2>
      <UserListStyle>
        {sortedUsers.map((user) => (
          <UserItemStyle key={user.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img src={`/avatars/${user?.avatar}.webp`} alt="avatar" />
              <span>
                {user.name}
                {user.isHost && " (Anfitrión)"}
              </span>
            </div>

            <div>
              {votesRevealed ? (
                <CircleStyle color="#D8DCE3">
                  {votes[user.id] ? votes[user.id].value : "--"}
                </CircleStyle>
              ) : user.hasVoted ? (
                <CircleStyle color="transparent">
                  <Check color="green" />
                </CircleStyle>
              ) : (
                <CircleStyle color="transparent">
                  <Clock color="red" />
                </CircleStyle>
              )}
            </div>
          </UserItemStyle>
        ))}
      </UserListStyle>
    </div>
  );
};

export default UserList;
