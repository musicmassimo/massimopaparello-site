import { useLayoutEffect, useRef, type ComponentType, type CSSProperties } from "react"
import gsap from "gsap"
import { Instagram, Youtube, Facebook, type LucideProps } from "lucide-react"
import TopNav from "@/components/TopNav"
import { publicAsset } from "@/lib/asset"
import ShowsSection from "@/components/sections/ShowsSection"
import BioSection from "@/components/sections/BioSection"
import GallerySection from "@/components/sections/GallerySection"
import MusicSection from "@/components/sections/MusicSection"
import InquiriesSection from "@/components/sections/InquiriesSection"

// lucide-react ships no TikTok glyph, so this is a hand-drawn stroke icon that
// matches the weight and 24x24 grid of the lucide Instagram/YouTube icons and
// honours the same `size` / `strokeWidth` props the map below passes.
const TikTok = ({ size = 24, strokeWidth = 2 }: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

// Split-flap departure-board reveal for the hero name. Each character is a
// fixed-width "card" that flips (rotateX drop, ease "none") through FLAP_FLIPS
// random glyphs before locking onto its real letter; cards land left-to-right
// FLAP_STAGGER apart. One GSAP tween per card, all killed on unmount. Exported
// constants are covered by src/test/split-flap.test.ts against the 1.5-2.5s /
// 30-60ms spec.
export const FLAP_FLIPS = 18
export const FLAP_FLIP_DUR = 0.08 // seconds per flip
export const FLAP_STAGGER = 0.045 // seconds between adjacent cards landing
const FLAP_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

/** Resolve timings (ms) for a name of `charCount` characters. */
export const flapResolveMs = (charCount: number) => {
  const perCard = (FLAP_FLIPS + 1) * FLAP_FLIP_DUR * 1000
  return { first: perCard, last: (charCount - 1) * FLAP_STAGGER * 1000 + perCard }
}

const randomGlyph = () => FLAP_GLYPHS[Math.floor(Math.random() * FLAP_GLYPHS.length)]

const SplitFlapName = ({ text, style }: { text: string; style?: CSSProperties }) => {
  const rootRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const cards = rootRef.current?.querySelectorAll<HTMLElement>("[data-flap]")
    if (!cards?.length) return

    const finals = text.split("")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((c, i) => { c.textContent = finals[i] === " " ? " " : finals[i] })
      return
    }

    const tweens = Array.from(cards).map((card, i) => {
      if (finals[i] === " ") { card.textContent = " "; return null }
      return gsap.fromTo(
        card,
        { rotateX: 90 },
        {
          rotateX: 0,
          duration: FLAP_FLIP_DUR,
          ease: "none",
          repeat: FLAP_FLIPS,
          delay: i * FLAP_STAGGER,
          onStart: () => { card.textContent = randomGlyph() },
          onRepeat: () => { card.textContent = randomGlyph() },
          onComplete: () => { card.textContent = finals[i]; gsap.set(card, { rotateX: 0 }) },
        },
      )
    })

    return () => { tweens.forEach((t) => t?.kill()) }
  }, [text])

  return (
    <h1
      ref={rootRef}
      className="text-white"
      aria-label={text}
      style={{ perspective: "600px", ...style }}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          data-flap={ch === " " ? undefined : ""}
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: ch === " " ? "0.4em" : "0.72em",
            textAlign: "center",
            transformStyle: "preserve-3d",
            // seam: a faint 1px line across the middle of every card
            backgroundImage:
              ch === " "
                ? undefined
                : "linear-gradient(rgba(0,0,0,0) calc(50% - 1px), rgba(0,0,0,0.35) calc(50% - 1px), rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 50%)",
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </h1>
  )
}

const socialLinks: { label: string; href: string; Icon: ComponentType<LucideProps> }[] = [
  { label: "Instagram", href: "https://www.instagram.com/musicmassimo/", Icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@massimopaparello0213", Icon: Youtube },
  { label: "TikTok", href: "https://www.tiktok.com/@massimo.paparello", Icon: TikTok },
  { label: "Facebook", href: "https://www.facebook.com/orangefoot13/", Icon: Facebook },
]

// One continuously-scrolling homepage. The hero photo is a FIXED full-viewport
// background layer (`position: fixed; inset: 0; z-index: 0`) that never moves —
// a parallax effect — with a fixed scrim on top of it for legibility. The hero
// name/nav and every section (Shows, Bio, Gallery, Music, Inquiries) sit ABOVE
// it (`position: relative; z-index: 10`) with translucent dark backgrounds, so
// the photo stays visible behind everything as the page scrolls.
const Index = () => {
  return (
    <>
      {/* Fixed parallax background: photo + scrim, both pinned to the viewport
          so they stay perfectly still while all content scrolls over them. */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 0, background: "#000", overflow: "hidden" }}
      >
        <img
          src={publicAsset("images/massimo-12.jpg")}
          alt=""
          loading="eager"
          decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.28) 26%, rgba(0,0,0,0.28) 70%, rgba(0,0,0,0.62) 100%)",
          }}
        />
      </div>

      <TopNav />

      <header
        id="top"
        className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center gap-7 px-6 text-center"
      >
        {/* Social icons + name, sitting directly over the fixed photo. */}
        <div
          className="flex items-center gap-5"
          style={{ filter: "drop-shadow(0 1px 8px rgba(0,0,0,0.55))" }}
        >
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-white/80 transition duration-200 ease-out hover:-translate-y-1 hover:opacity-100 hover:text-white hover:drop-shadow-[0_5px_8px_rgba(0,0,0,0.55)]"
            >
              <Icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <div>
          <SplitFlapName
            text="MASSIMO PAPARELLO"
            style={{
              fontFamily: "'Silkscreen', cursive",
              fontWeight: 700,
              // Silkscreen is a blocky pixel face and runs much wider than the
              // old serif, so the clamp min/slope are pulled down to keep
              // "MASSIMO PAPARELLO" on one line down to ~360px viewports.
              fontSize: "clamp(1.25rem, 5vw, 3rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.05,
              textShadow: "0 2px 22px rgba(0,0,0,0.55)",
            }}
          />
        </div>
      </header>

      <ShowsSection />
      <BioSection />
      <GallerySection />
      <MusicSection />
      <InquiriesSection />

      <footer
        className="relative z-10"
        style={{
          background: "rgba(0,0,0,0.58)",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "'Space Grotesk', monospace",
          padding: "40px 24px",
          textAlign: "center",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        © 2026 Massimo Paparello. All rights reserved.
      </footer>
    </>
  )
}

export default Index
