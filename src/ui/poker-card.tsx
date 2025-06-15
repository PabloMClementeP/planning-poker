import type { PokerCardValue } from "../types";
import {
  CardWrapper,
  CardContent,
  CardValue,
  SelectedLabel,
  SmallText,
} from "./poker-card-style";

interface PokerCardProps {
  value: PokerCardValue;
  isSelected?: boolean;
  isRevealed?: boolean;
  actualVoteValue?: PokerCardValue;
  onClick?: () => void;
  interactive?: boolean;
  width?: number;
}

const PokerCardIcon = ({ value }: { value: PokerCardValue }) => {
  if (value === "☕️")
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("/coffe.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          aspectRatio: "1/1",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
        }}
      ></div>
    );
  if (value === "?") return <span>?</span>;
  return null;
};

export function PokerCard({
  value,
  isSelected = false,
  isRevealed,
  actualVoteValue,
  onClick,
  interactive = true,
  width,
}: PokerCardProps) {
  const displayValue = isRevealed ? actualVoteValue ?? value : value;
  const showBack = !isRevealed && interactive;

  return (
    <CardWrapper
      onClick={interactive ? onClick : undefined}
      isSelected={isSelected}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e: React.KeyboardEvent) =>
              (e.key === "Enter" || e.key === " ") && onClick?.()
          : undefined
      }
      $width={width}
    >
      <CardContent>
        {showBack && !isSelected && (
          <CardValue>
            {typeof value === "number" ||
            (typeof value === "string" && !isNaN(Number(value))) ? (
              value
            ) : (
              <PokerCardIcon value={value} />
            )}
          </CardValue>
        )}
        {showBack && isSelected && (
          <>
            <SelectedLabel>Voto</SelectedLabel>
            <CardValue>{value}</CardValue>
          </>
        )}
        {!showBack && (
          <>
            <CardValue>
              {typeof displayValue === "number" ||
              (typeof displayValue === "string" &&
                !isNaN(Number(displayValue))) ? (
                displayValue
              ) : (
                <PokerCardIcon value={displayValue} />
              )}
            </CardValue>
            {isRevealed &&
              typeof displayValue !== "number" &&
              typeof displayValue !== "string" && (
                <SmallText>{displayValue}</SmallText>
              )}
          </>
        )}
      </CardContent>
    </CardWrapper>
  );
}
