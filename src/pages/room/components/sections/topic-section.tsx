import { useState } from "react";
import Clipboard from "../../../../ui/icons/clipboard";
import {
  CurrentTopic,
  InputsWrapper,
  Paragraph,
  TitleContainer,
} from "./topic-section-style";
import { Button } from "../styles/card";

interface TopicSectionProps {
  currentTopic: string;
  onSetTopic: (topic: string) => void;
  isHost: boolean;
}

export const TopicSection = ({
  currentTopic,
  onSetTopic,
  isHost,
}: TopicSectionProps) => {
  const [topicInput, setTopicInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (topicInput.trim() !== "") {
      onSetTopic(topicInput);
      setTopicInput("");
    }
  };

  return (
    <div>
      {isHost && (
        <form onSubmit={handleSubmit}>
          <TitleContainer>
            <Clipboard color="#6DD5ED" />
            <h2>Historia / Tema Actual</h2>
          </TitleContainer>
          <InputsWrapper>
            <input
              id="topicInput"
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Ingrese el tema de la historia aquí"
            />
            <Button type="submit">
              {currentTopic ? "Actualizar historia" : "Establecer historia"}
            </Button>
          </InputsWrapper>
        </form>
      )}

      {currentTopic ? (
        <div>
          <h3>Estimando historia:</h3>
          <CurrentTopic>
            <h2>{currentTopic}</h2>
          </CurrentTopic>
        </div>
      ) : (
        <Paragraph>
          {isHost
            ? "Establezca una historia para comenzar..."
            : "Esperando que el anfitrión establezca un tema para comenzar a votar."}
        </Paragraph>
      )}
    </div>
  );
};
