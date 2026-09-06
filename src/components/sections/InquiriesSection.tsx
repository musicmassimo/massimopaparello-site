import { useState } from "react";
import { sectionHeading, sectionInner, sectionKicker, sectionShell } from "./sectionStyles";

// The "Inquiries" section — was the standalone Inquiries route. Booking contact
// rows, a real contact form that POSTs to public/contact.php, and the social
// links. The old per-page 60vh photo banner is dropped now that the homepage
// hero covers that job.

const contacts = [
  { label: "General, Bookings & Teaching", value: "massimo@massimopaparello.com", href: "mailto:massimo@massimopaparello.com" },
  { label: "Syndicate Bookings", value: "syndicatebookings@massimopaparello.com", href: "mailto:syndicatebookings@massimopaparello.com" },
  { label: "Based in", value: "Los Angeles, CA" },
];

const socials = [
  { label: "Instagram", handle: "@musicmassimo", href: "https://www.instagram.com/musicmassimo/" },
  { label: "YouTube", handle: "@massimopaparello0213", href: "https://youtube.com/@massimopaparello0213" },
  { label: "TikTok", handle: "@massimo.paparello", href: "https://www.tiktok.com/@massimo.paparello" },
  { label: "Facebook", handle: "orangefoot13", href: "https://www.facebook.com/orangefoot13/" },
  { label: "Threads", handle: "@musicmassimo", href: "https://www.threads.com/@musicmassimo" },
];

const s = {
  label: { fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.55)" },
  row: { fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.85)", transition: "opacity 0.3s", cursor: "default" },
};

const HoverRow = ({ children, style, onClick, className }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void; className?: string }) => (
  <div
    className={className}
    style={{ ...s.row, opacity: 0.85, ...style }}
    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
    onClick={onClick}
  >
    {children}
  </div>
);

/*
 * Label / value rows. On desktop these sit on one line (label left, value
 * right). On narrow screens the long email addresses and handles are single
 * unbreakable tokens that push past the viewport and get clipped, so below
 * 600px the row stacks vertically and long values are allowed to wrap.
 */
const rowCss = `
  .cx-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cx-row > :last-child {
    overflow-wrap: anywhere;
  }
  @media (max-width: 600px) {
    .cx-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }
`;

const field: React.CSSProperties = {
  width: "100%",
  background: "rgba(0,0,0,0.25)",
  border: 0,
  borderBottom: "1px solid rgba(255,255,255,0.5)",
  color: "#fff",
  fontFamily: "'Space Grotesk', monospace",
  fontSize: 13,
  letterSpacing: "0.05em",
  padding: "10px 0",
  outline: "none",
};

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
  marginBottom: 10,
};

const subGroup: React.CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.1)",
  marginTop: 60,
  paddingTop: 60,
};

type Status = "idle" | "sending" | "ok" | "error";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: real users never see or fill this. A non-empty value on submit
  // means a bot, so we silently accept without sending.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (website.trim() !== "") {
      // Pretend it worked; drop the submission.
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}contact.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || (data && data.ok === false)) {
        throw new Error((data && data.error) || `Unable to send (${res.status}).`);
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const btnBg = status === "sending" ? "rgba(255,255,255,0.1)" : "transparent";

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 520 }}
    >
      <div>
        <label htmlFor="cf-name" style={fieldLabel}>Name</label>
        <input
          id="cf-name"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          style={field}
        />
      </div>

      <div>
        <label htmlFor="cf-email" style={fieldLabel}>Email</label>
        <input
          id="cf-email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={field}
        />
      </div>

      <div>
        <label htmlFor="cf-message" style={fieldLabel}>Message</label>
        <textarea
          id="cf-message"
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          style={{
            ...field,
            border: "1px solid rgba(255,255,255,0.3)",
            padding: 12,
            minHeight: 120,
            resize: "vertical",
            lineHeight: 1.7,
          }}
        />
      </div>

      {/* Honeypot — hidden from humans, ignored by assistive tech, left empty. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={e => setWebsite(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            border: "1px solid rgba(255,255,255,0.4)",
            background: btnBg,
            color: "#fff",
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "11px 24px",
            cursor: status === "sending" ? "default" : "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            if (status === "sending") return;
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = btnBg;
            e.currentTarget.style.color = "#fff";
          }}
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>

        {status === "ok" && (
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
            Thanks — your message is on its way.
          </span>
        )}
        {status === "error" && (
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
            {error || "Something went wrong."} Email massimo@massimopaparello.com instead.
          </span>
        )}
      </div>
    </form>
  );
};

const InquiriesSection = () => (
  <section id="inquiries" style={{ ...sectionShell, overflowX: "hidden" }}>
    <style>{rowCss}</style>
    <div style={{ ...sectionInner, maxWidth: 800 }}>
      <p style={sectionKicker}>Get In Touch</p>
      <h2 style={sectionHeading}>Inquiries</h2>

      <p style={{ ...s.label, marginBottom: 32 }}>Booking &amp; Management</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {contacts.map((c, i) => (
          <HoverRow key={i} className="cx-row">
            <span>{c.label}</span>
            {c.href ? (
              <a href={c.href} style={{ color: "inherit", textDecoration: "none" }}>{c.value}</a>
            ) : (
              <span>{c.value}</span>
            )}
          </HoverRow>
        ))}
      </div>

      <div style={subGroup}>
        <p style={{ ...s.label, marginBottom: 32 }}>Send a Message</p>
        <ContactForm />
      </div>

      <div style={subGroup}>
        <p style={{ ...s.label, marginBottom: 32 }}>Follow Massimo Paparello</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {socials.map((item, i) => (
            <HoverRow key={i} className="cx-row">
              <span>{item.label}</span>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {item.handle}
              </a>
            </HoverRow>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default InquiriesSection;
