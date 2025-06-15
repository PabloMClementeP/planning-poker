import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AvatarOption,
  AvatarPicker,
  Footer,
  Header,
  HeaderTitle,
  Label,
  StyledDices,
  Subtitle,
  Title,
  Wrapper,
} from "./style";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  InputsWrappers,
} from "../room/components/styles/card";
import { avatars } from "../../types";

function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [_, setUserId] = useState<string>("");
  const [roomId, setRoomId] = useState<string | null>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  useEffect(() => {
    setIsMounted(true);
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      let userId = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userId", userId);
      setUserId(userId);
    }

    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar !== null) {
      const avatarIndex = Number(storedAvatar);
      if (!isNaN(avatarIndex) && avatars[avatarIndex]) {
        setSelectedAvatar(avatars[avatarIndex]);
      }
    }
  }, []);

  const handleJoinRoom = () => {
    if (!userName?.trim()) {
      toast.error("Por favor, introduce tu nombre.");
      return;
    }

    if (!roomId?.trim()) {
      toast.error("Por favor, introduce un ID de sala válido.");
      return;
    }

    localStorage.setItem("userName", userName.trim());
    localStorage.setItem("avatar", String(avatars.indexOf(selectedAvatar)));
    navigate(`/room/${roomId.trim()}`);
  };

  const handleCreateRoom = () => {
    if (!userName?.trim()) {
      toast.error("Por favor, introduce tu nombre.");
      return;
    }

    localStorage.setItem("userName", userName.trim());
    localStorage.setItem("avatar", String(avatars.indexOf(selectedAvatar)));
    localStorage.setItem("isHost", "true");

    const newRoomId = isMounted
      ? Math.random().toString(36).substr(2, 9)
      : "defaultRoom";
    navigate(`/room/${newRoomId}`);
  };

  if (!isMounted) {
    return (
      <Wrapper>
        <StyledDices src="/icons/dices.svg" alt="Icono Dices" $animate />
        <Title>Easy Planning Poker</Title>
        <Subtitle>Cargando...</Subtitle>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        <StyledDices src="/icons/dices.svg" alt="Icono Dices" />
        <HeaderTitle>Easy Planning Poker</HeaderTitle>
        <Subtitle>¡Bienvenido! Comienza tu sesión</Subtitle>
      </Header>

      <Card>
        <CardHeader>
          <CardTitle>Comenzar</CardTitle>
          <CardDescription>
            Introduce tu nombre y únete a una sala existente o crea una nueva.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <InputsWrappers>
            <label htmlFor="userName">Tu Nombre</label>
            <input
              id="userName"
              type="text"
              placeholder="Ej.: John Doe"
              value={userName || ""}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputsWrappers>

          <InputsWrappers>
            <label htmlFor="roomId">ID de Sala</label>
            <input
              id="roomId"
              type="text"
              placeholder="Introduce el ID de una sala para unirte"
              value={roomId || ""}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </InputsWrappers>

          <InputsWrappers>
            <Label>Selecciona un avatar</Label>
            <AvatarPicker>
              {avatars.map((avatar, index) => (
                <AvatarOption $isSelected={selectedAvatar === avatar}>
                  <img
                    src={`/avatars/${avatar}.webp`}
                    alt="avatar"
                    width={60}
                    height={60}
                    onClick={() => setSelectedAvatar(avatar)}
                    key={`${avatar}-${index}`}
                  />
                </AvatarOption>
              ))}
            </AvatarPicker>
          </InputsWrappers>
        </CardContent>

        <CardFooter>
          <Button onClick={handleJoinRoom}>Unirse a Sala</Button>
          <Button onClick={handleCreateRoom}>Crear Nueva Sala</Button>
        </CardFooter>
      </Card>

      <Footer>
        <p>
          &copy; {new Date().getFullYear()} Planning Poker. Creado para{" "}
          <strong>Easy</strong> team.
        </p>
      </Footer>
    </Wrapper>
  );
}

export default HomePage;
