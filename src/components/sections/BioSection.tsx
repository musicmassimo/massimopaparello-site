import { sectionHeading, sectionInner, sectionKicker, sectionShell } from "./sectionStyles";

// The "About" section — was the standalone About route. Text only; the old
// per-page full-viewport portrait hero is dropped now that the homepage hero
// covers that job.
const bioLines = [
  "Born and raised in Los Angeles, CA, trumpeter Massimo Paparello brings nearly two decades of performance experience across jazz, soul, funk, pop, R&B, indie, and hip hop. He holds a Bachelor's and Master's degree in Jazz Performance from the New England Conservatory in Boston. His mentors include Jason Palmer, Jason Moran, and Cecil McBee.",
  "Massimo has performed at some of the country's most storied stages, including the Monterey Jazz Festival, Jordan Hall, Walt Disney Concert Hall, Dizzy's Club, Smalls Jazz Club, and The Lighthouse Cafe. His touring credits include nine months on the road with the BB King Allstars, and multi-month cruise ship contracts that took him to 39 countries, performing entirely by ear across international ports and onboard entertainment circuits.",
  "Beyond the stage, Massimo is an active arranger and composer, writing horn section parts and full band arrangements. He also leads his own jazz quintet, SYNDICATE, and works regularly as a transcriber for solos, horn lines, and ensemble parts.",
];

const BioSection = () => (
  <section id="bio" style={sectionShell}>
    <div style={{ ...sectionInner, maxWidth: 800 }}>
      <p style={sectionKicker}>The Artist</p>
      <h2 style={sectionHeading}>About</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {bioLines.map((line, i) => (
          <p
            key={i}
            style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.7)", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  </section>
);

export default BioSection;
