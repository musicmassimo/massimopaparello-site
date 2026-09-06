import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

// The site is a single continuously-scrolling homepage, so nav entries are
// smooth-scroll anchors to sections rather than router routes.
//
// `anchor` is a section id, or the sentinel "top" for the hero / page top.
// `external` entries are real navigations to a *different* site (e.g. TEACHING,
// a separate WordPress install) — they must always stay real links, never
// anchors, even though none is in the nav right now.
interface AnchorItem {
  label: string;
  anchor: string;
}
interface ExternalItem {
  label: string;
  href: string;
  external: true;
}
type NavItem = AnchorItem | ExternalItem;

const isAnchor = (item: NavItem): item is AnchorItem => "anchor" in item;

const navItems: NavItem[] = [
  { label: "HOME", anchor: "top" },
  { label: "ABOUT", anchor: "bio" },
  { label: "MUSIC", anchor: "music" },
  { label: "GALLERY", anchor: "gallery" },
  { label: "LIVE", anchor: "shows" },
  { label: "INQUIRIES", anchor: "inquiries" },
];

// Section ids the scroll-spy observes (everything except the "top" sentinel).
const SPY_IDS = navItems
  .filter(isAnchor)
  .map(i => i.anchor)
  .filter(a => a !== "top");

const linkFont = {
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  fontFamily: "'Silkscreen', cursive",
  // Silkscreen tops out at 700; a 1px white text-stroke thickens the pixel
  // blocks past that while staying crisp over the bright hero photo.
  WebkitTextStroke: "1px #fff",
  color: "#fff",
  background: "transparent",
  border: 0,
  cursor: "pointer",
};

const PANEL_BG = "#000";
const PANEL_BORDER = "1px solid rgba(255,255,255,0.1)";
const ITEM_DIVIDER = "1px solid rgba(255,255,255,0.08)";

const scrollToTarget = (anchor: string) => {
  if (anchor === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
};

const TopNav = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState<string>("top");
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = useCallback((anchor: string) => {
    scrollToTarget(anchor);
    setMobileOpen(false);
  }, []);

  // Scroll-spy: highlight whichever section currently sits in the middle band
  // of the viewport; fall back to "top" (HOME) when scrolled to the very top.
  useEffect(() => {
    const els = SPY_IDS
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      entries => {
        const inView = entries.filter(e => e.isIntersecting);
        if (inView.length > 0) {
          inView.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(inView[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    els.forEach(el => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 40) setActiveId("top");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu on outside click or Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const itemStyle = (item: NavItem) => {
    const active = isAnchor(item) && item.anchor === activeId;
    return {
      ...linkFont,
      borderBottom: active ? "1px solid #fff" : "1px solid transparent",
      paddingBottom: 1,
    };
  };

  const renderItem = (item: NavItem, extraClass: string, style: React.CSSProperties) => {
    if (!isAnchor(item)) {
      return (
        <a key={item.label} href={item.href} className={`block ${extraClass}`} style={style}>
          {item.label}
        </a>
      );
    }
    return (
      <button
        key={item.label}
        type="button"
        onClick={() => go(item.anchor)}
        className={extraClass}
        style={style}
      >
        {item.label}
      </button>
    );
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-[44px]"
      style={{
        // Opaque-ish bar so section headings scroll cleanly BEHIND the fixed
        // nav instead of colliding with it; over the hero this blends into the
        // existing top scrim.
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Desktop / tablet (>= 768px): a horizontal row of anchors */}
      <div className="hidden md:flex justify-center items-center gap-3 lg:gap-8">
        {navItems.map(item =>
          renderItem(item, "transition-opacity hover:opacity-70 px-2 lg:px-3", {
            ...itemStyle(item),
            lineHeight: "40px",
          })
        )}
      </div>

      {/* Mobile (< 768px): hamburger + dropdown panel */}
      <div className="md:hidden">
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="topnav-mobile-menu"
          onClick={() => setMobileOpen(v => !v)}
          className="absolute right-3 top-0 flex h-[44px] w-[44px] items-center justify-center border-none bg-transparent cursor-pointer transition-opacity hover:opacity-80"
          style={{ color: "#fff" }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {mobileOpen && (
          <div
            id="topnav-mobile-menu"
            className="absolute right-3 top-[44px] z-50 flex flex-col"
            style={{ minWidth: 200, background: PANEL_BG, border: PANEL_BORDER }}
          >
            {navItems.map((item, i) =>
              renderItem(item, "w-full text-left transition-opacity hover:opacity-80", {
                ...itemStyle(item),
                padding: "14px 20px",
                borderTop: i === 0 ? undefined : ITEM_DIVIDER,
                borderBottom: undefined,
              })
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
