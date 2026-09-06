// Shared look for the stacked homepage sections. Every section is an opaque
// black block that sits ABOVE the fixed hero (position + z-index) so nothing
// bleeds through once it has been scrolled past, and everything renders in the
// site's established Space Grotesk / white-on-black treatment.

import type { CSSProperties } from "react";

const SPACE_GROTESK = "'Space Grotesk', monospace";

export const sectionShell: CSSProperties = {
  position: "relative",
  zIndex: 10,
  background: "#000",
  color: "#fff",
  fontFamily: SPACE_GROTESK,
  borderTop: "1px solid rgba(255,255,255,0.08)",
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
  color: "rgba(255,255,255,0.4)",
  margin: 0,
};

// Explicit font-family so the global `h1..h6 { Cormorant Garamond }` base rule
// in index.css doesn't drag section headings into a serif face.
export const sectionHeading: CSSProperties = {
  fontFamily: SPACE_GROTESK,
  fontWeight: 500,
  fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
  letterSpacing: "-0.01em",
  lineHeight: 1.1,
  margin: "12px 0 36px",
  color: "#fff",
};
