// Shared look for the stacked homepage sections.
//
// The hero photo is a FIXED full-viewport background layer (see Index.tsx), so
// every section is a translucent dark panel that scrolls over it — the photo
// stays visible behind all of them. `position` + `z-index` keep the panels
// above the fixed background; the ~0.58 black wash keeps white text readable
// against the photo. Text renders in the site's established Space Grotesk.

import type { CSSProperties } from "react";

const SPACE_GROTESK = "'Space Grotesk', monospace";

export const sectionShell: CSSProperties = {
  position: "relative",
  zIndex: 10,
  background: "rgba(0, 0, 0, 0.58)",
  color: "#fff",
  fontFamily: SPACE_GROTESK,
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
};

export const sectionInner: CSSProperties = {
  maxWidth: 860,
  margin: "0 auto",
  padding: "88px 24px",
};

export const sectionKicker: CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(255, 255, 255, 0.55)",
  margin: 0,
};

// Explicit font-family so the global `h1..h6 { Cormorant Garamond }` base rule
// in index.css doesn't drag section headings into a serif face; text-shadow
// keeps the heading crisp where the photo behind is light.
export const sectionHeading: CSSProperties = {
  fontFamily: SPACE_GROTESK,
  fontWeight: 500,
  fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
  letterSpacing: "-0.01em",
  lineHeight: 1.1,
  margin: "12px 0 36px",
  color: "#fff",
  textShadow: "0 1px 14px rgba(0, 0, 0, 0.45)",
};
