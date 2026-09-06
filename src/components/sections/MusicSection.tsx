import { sectionHeading, sectionInner, sectionKicker, sectionShell } from "./sectionStyles";

// The "Music" section — folds together the old Music and Videos routes: a
// featured YouTube performance, the Spotify track Massimo played trumpet on,
// and a link out to the full channel.
const MusicSection = () => (
  <section id="music" style={sectionShell}>
    <div style={{ ...sectionInner, maxWidth: 800 }}>
      <p style={sectionKicker}>Listen</p>
      <h2 style={sectionHeading}>Music</h2>

      <p style={{ ...sectionKicker, marginBottom: 16 }}>Featured Video</p>
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

      <p style={{ ...sectionKicker, margin: "48px 0 16px" }}>
        Trumpet on &ldquo;7 / 31 / 26 (four)&rdquo; &mdash; Secret Sister Studio
      </p>
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

      <p style={{ marginTop: 48, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
        Recordings and releases are on the way. In the meantime, watch more live sets and hear more of Massimo on{" "}
        <a
          href="https://youtube.com/@massimopaparello0213"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-white"
        >
          his YouTube channel
        </a>
        .
      </p>
    </div>
  </section>
);

export default MusicSection;
