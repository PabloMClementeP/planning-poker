export interface User {
  id: string;
  name: string;
  isHost?: boolean;
  hasVoted?: boolean;
  avatar?: string;
  isOnline?: boolean;
}

export interface Vote {
  userId: string;
  value: PokerCardValue;
}

export type PokerCardValue = string | number;

export const POKER_VALUES: PokerCardValue[] = [
  "0",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "?",
  "☕️",
];

export const avatars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
