import type { ComponentType } from "react"
import { Instagram, Youtube, type LucideProps } from "lucide-react"
import TopNav from "@/components/TopNav"
import { publicAsset } from "@/lib/asset"

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

const socialLinks: { label: string; href: string; Icon: ComponentType<LucideProps> }[] = [
  { label: "Instagram", href: "https://www.instagram.com/musicmassimo/", Icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@massimopaparello0213", Icon: Youtube },
  { label: "TikTok", href: "https://www.tiktok.com/@massimo.paparello", Icon: TikTok },
]

const Index = () => {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Full-bleed hero photo */}
      <img
        src={publicAsset("images/massimo-12.jpg")}
        alt="Massimo Paparello"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Scrim: darker at top/bottom for legibility, clear through the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 28%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Name + nav, layered centered directly on the photo */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-7 px-6 text-center">
        <div className="flex items-center gap-5">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-white/70 transition-opacity hover:opacity-80 hover:text-white"
            >
              <Icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <div>
          <h1
            className="text-white"
            style={{
              fontFamily: "'Silkscreen', cursive",
              fontWeight: 700,
              // Silkscreen is a blocky pixel face and runs much wider than the
              // old serif, so the clamp min/slope are pulled down to keep
              // "MASSIMO PAPARELLO" on one line down to ~360px viewports.
              fontSize: "clamp(1.25rem, 5vw, 3rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            Massimo Paparello
          </h1>
        </div>

        <TopNav layout="inline" />
      </div>
    </div>
  )
}

export default Index
