import { useState } from "react";
import { shows } from "@/data/shows";
import { sectionHeading, sectionKicker, sectionShell } from "./sectionStyles";

// The "Live" section — was the standalone Calendar route. The optional
// per-show hover image is scoped to this section (absolute inset-0, clipped by
// overflow-hidden) rather than a viewport-fixed layer, so it can never paint
// over the hero or the sections above/below.
const ShowsSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="shows" style={{ ...sectionShell, overflow: "hidden" }}>
      {shows.map((d, i) =>
        d.image ? (
          <div
            key={`bg-${i}`}
            aria-hidden="true"
            className="pointer-events-none"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url(${d.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: hovered === i ? 0.35 : 0,
              transition: "opacity 0.7s ease",
            }}
          />
        ) : null
      )}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "88px 24px" }}>
        <p style={sectionKicker}>Live</p>
        <h2 style={sectionHeading}>Shows</h2>

        {shows.length === 0 && (
          <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
            No shows currently booked — check back soon.
          </p>
        )}

        {shows.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-4"
            style={{
              padding: "18px 0",
              borderTop: "1px solid rgba(255,255,255,0.18)",
              opacity: hovered === i ? 1 : 0.85,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex-1">
              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {d.city ? `${d.venue} · ${d.city}` : d.venue}
              </p>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em" }}>
                {d.time ? `${d.date} · ${d.time}` : d.date}
              </span>
              {d.note && (
                <span
                  className="block"
                  style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  {d.note}
                </span>
              )}
            </div>

            <div className="shrink-0 text-right">
              {d.ticketLink && (
                <a
                  href={d.ticketLink}
                  className="inline-block border border-white/40 hover:bg-white transition-all duration-200 text-white hover:text-black"
                  style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", padding: "4px 14px" }}
                >
                  GET TICKETS
                </a>
              )}
            </div>
          </div>
        ))}

        {shows.length > 0 && <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }} />}
      </div>
    </section>
  );
};

export default ShowsSection;
