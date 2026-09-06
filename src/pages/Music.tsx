import TopNav from "@/components/TopNav";

// No fabricated album/tracklist here — the previous template shipped a fake
// "Lucid Architecture" release. This stays a simple honest placeholder until
// real recordings/releases are ready to link.
const Music = () => (
  <main
    className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace" }}
  >
    <TopNav />
    <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Music</h1>
    <p className="mt-4 max-w-md" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
      Recordings and releases are on the way. In the meantime, hear Massimo play on{" "}
      <a
        href="https://youtube.com/@massimopaparello0213"
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-white"
      >
        YouTube
      </a>.
    </p>
  </main>
);

export default Music;
