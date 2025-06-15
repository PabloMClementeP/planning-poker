import type { PokerCardValue } from "../../../../types";
import ChartColumn from "../../../../ui/icons/chart-column";
import { PokerCard } from "../../../../ui/poker-card";
import { CardsContainer, SectionText } from "./voting-section-style";

interface VotingSectionProps {
  values: PokerCardValue[];
  onVote: (value: PokerCardValue) => void;
  selectedVote?: PokerCardValue;
  votesRevealed: boolean;
}

const VotingSection = ({
  values,
  onVote,
  selectedVote,
  votesRevealed,
}: VotingSectionProps) => {
  return (
    <div>
      {votesRevealed ? (
        <p>Votes have been revealed. Reset the session to vote again.</p>
      ) : (
        <>
          <SectionText>
            <ChartColumn color="#6DD5ED" />
            Selecciona tu estimación:
          </SectionText>
          <CardsContainer>
            {values.map((value) => (
              <PokerCard
                key={String(value)}
                value={value}
                isSelected={selectedVote === value}
                onClick={() => onVote(value)}
              />
            ))}
          </CardsContainer>
        </>
      )}
    </div>
  );
};

export default VotingSection;
