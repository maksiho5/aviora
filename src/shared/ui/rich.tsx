import { Circled } from "./circled";

/** Tags allowed inside translated strings. */
export const richTags = {
  em: (chunks: React.ReactNode) => <em className="italic">{chunks}</em>,
  circle: (chunks: React.ReactNode) => <Circled>{chunks}</Circled>,
};
