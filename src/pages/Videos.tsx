import TopNav from "@/components/TopNav";

// The previous template's video grid was entirely fabricated (fake titles,
// stock Unsplash thumbnails, a made-up EDM catalog). What's here is real: one
// featured performance embed plus a link to Massimo's actual YouTube channel.

const label: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 16,
};

const Videos = () => (
  <main style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace", minHeight: "100vh" }}>
    <TopNav />

    <section style={{ padding: "100px 24px 0", maxWidth: 800, margin: "0 auto" }}>
      <p style={label}>Watch</p>
      <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Videos</h1>
    </section>

    <section style={{ padding: "48px 24px 0", maxWidth: 800, margin: "0 auto" }}>
      <p style={label}>Featured Video</p>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#000" }}>
        <iframe
          src="https://www.youtube.com/embed/K5M1PLhHfJg"
          title="Massimo Paparello — featured performance"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    </section>

    <section style={{ padding: "48px 24px 100px", maxWidth: 800, margin: "0 auto" }}>
      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
        Watch more live sets and performance footage on{" "}
        <a
          href="https://youtube.com/@massimopaparello0213"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-white"
        >
          Massimo's YouTube channel
        </a>.
      </p>
    </section>

    <footer style={{ padding: "40px 24px", textAlign: "center", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
      © 2026 Massimo Paparello. All rights reserved.
    </footer>
  </main>
);

export default Videos;
