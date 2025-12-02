import type { ToneId } from "../types";

export type Tone = {
  id: ToneId;
  name: string;
  description: string;
};

export const tones: readonly Tone[] = [
  {
    id: "friendly",
    name: "Friendly",
    description: "Warm and conversational tone",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Formal and business-like responses",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Imaginative and expressive",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Precise technical language",
  },
];

export const DEFAULT_TONE: ToneId = "friendly";
