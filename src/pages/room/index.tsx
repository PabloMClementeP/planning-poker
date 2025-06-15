import { useParams } from "react-router-dom";
import RoomClient from "./components/room-client";
import { Header, Logo, RoomWrapper } from "./room-style";
import { StyledDices } from "../home/style";
import { useState } from "react";
import Door from "../../ui/icons/door";

export const Room = () => {
  const { roomId } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <RoomWrapper>
      <Header>
        <div>
          <a href="/">
            <Door width={32} height={32} color="#73a0b9" />
          </a>
        </div>
        <Logo>
          <img src="/favicon.webp" alt="logo" width={32} height={32} />
          <p>Easy Planning Poker</p>
          <StyledDices
            src="/icons/dices.svg"
            alt="Icono Dices"
            $width={"32px"}
            $height={"32px"}
            style={{
              marginBottom: "0px",
            }}
          />
        </Logo>
        <>
          <span
            onClick={() => {
              handleCopy();
            }}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "4px 8px",
              borderRadius: "5px",
              minWidth: 140,
              width: 140,
              backgroundColor: copied ? "#2195f3b2" : "#f0f0f0",
              color: copied ? "#fff" : "#333",
              boxSizing: "border-box",
            }}
          >
            {copied ? (
              <span style={{ fontSize: 12 }}>Id Copiado ✅</span>
            ) : (
              <span style={{ fontSize: 14 }}>Copiar Room Id</span>
            )}
            {roomId}
          </span>
        </>
      </Header>

      <main
        style={{
          flex: 1,
          padding: "1.5rem",
        }}
      >
        {roomId && <RoomClient roomId={roomId} />}
      </main>

      <footer
        style={{
          boxSizing: "border-box",
          width: "100%",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        &copy; {new Date().getFullYear()} Easy Planning Poker. All rights
        reserved.
      </footer>
    </RoomWrapper>
  );
};
