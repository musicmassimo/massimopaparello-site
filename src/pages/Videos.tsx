import TopNav from "@/components/TopNav";

// The previous template's video grid was entirely fabricated (fake titles,
// stock Unsplash thumbnails, a made-up EDM catalog). Real footage lives on
// Massimo's actual YouTube channel — link out to it honestly instead of
// inventing content here.
const Videos = () => (
  <main
    className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    style={{ background: "#000", color: "#fff", fontFamily: "'Space Grotesk', monospace" }}
  >
    <TopNav />
    <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Videos</h1>
    <p className="mt-4 max-w-md" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
      Watch live sets and performance footage on{" "}
      <a
        href="https://youtube.com/@massimopaparello0213"
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-white"
      >
        Massimo's YouTube channel
      </a>.
    </p>
  </main>
);

export default Videos;
