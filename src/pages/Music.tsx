import TopNav from "@/components/TopNav";

// No fabricated album/tracklist here — the previous template shipped a fake
// "Lucid Architecture" release. What lives here is real: a featured performance
// video, a track Massimo played trumpet on, and a link to his channel.

const label: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 16,
};

const Music = () => (
  <main style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace", minHeight: "100vh" }}>
    <TopNav />

    <section style={{ padding: "100px 24px 0", maxWidth: 800, margin: "0 auto" }}>
      <p style={label}>Listen</p>
      <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Music</h1>
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

    <section style={{ padding: "48px 24px 0", maxWidth: 800, margin: "0 auto" }}>
      <p style={label}>Trumpet on &ldquo;7 / 31 / 26 (four)&rdquo; &mdash; Secret Sister Studio</p>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: 12 }}
        src="https://open.spotify.com/embed/track/45gO3CJ9CkDICOr6pN38z4?utm_source=generator&theme=0&si=891c36e9497e45ec"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Featured: trumpet performance"
      />
    </section>

    <section style={{ padding: "48px 24px 100px", maxWidth: 800, margin: "0 auto" }}>
      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
        Recordings and releases are on the way. In the meantime, hear more of Massimo on{" "}
        <a
          href="https://youtube.com/@massimopaparello0213"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-white"
        >
          YouTube
        </a>.
      </p>
    </section>

    <footer style={{ padding: "40px 24px", textAlign: "center", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
      © 2026 Massimo Paparello. All rights reserved.
    </footer>
  </main>
);

export default Music;
