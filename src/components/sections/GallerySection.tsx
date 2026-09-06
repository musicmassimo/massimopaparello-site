import { galleryImages } from "@/data/galleryImages";
import { sectionHeading, sectionInner, sectionKicker, sectionShell } from "./sectionStyles";

// The "Gallery" section — was the standalone Gallery/Photos route. Pulls the
// real, committed massimo-01..12 set from src/data/galleryImages.ts. Every tile
// reserves its aspect ratio so the grid doesn't reflow as images load; all are
// lazy since the section sits well below the fold.
const GallerySection = () => (
  <section id="gallery" style={sectionShell}>
    <div style={{ ...sectionInner, maxWidth: 1200 }}>
      <p style={sectionKicker}>Photos</p>
      <h2 style={sectionHeading}>Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map(img => (
          <div
            key={img.src}
            style={{ aspectRatio: `${img.width} / ${img.height}`, overflow: "hidden", background: "rgba(255,255,255,0.04)" }}
          >
            <img
              src={img.src}
              alt={img.alt ?? ""}
              width={img.width}
              height={img.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-80"
              style={{ objectPosition: img.objectPosition ?? "center" }}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
