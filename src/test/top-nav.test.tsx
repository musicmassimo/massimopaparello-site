import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopNav from "@/components/TopNav";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.body.querySelectorAll("section[data-test-section]").forEach(el => el.remove());
});

// The desktop and mobile trees are both in the DOM under jsdom (Tailwind's
// responsive classes aren't evaluated), so queries are scoped to the relevant
// container rather than the whole document.
const desktopNav = () => document.querySelector(".md\\:flex") as HTMLElement;
const mobileNav = () => document.querySelector(".md\\:hidden") as HTMLElement;

const LABELS = ["HOME", "ABOUT", "MUSIC", "GALLERY", "LIVE", "INQUIRIES"];

const addSection = (id: string) => {
  const el = document.createElement("section");
  el.id = id;
  el.setAttribute("data-test-section", "");
  document.body.appendChild(el);
  return el;
};

describe("TopNav — structure", () => {
  it("renders all six section links in the desktop bar", () => {
    render(<TopNav />);
    const bar = within(desktopNav());
    for (const label of LABELS) {
      expect(bar.getByText(label)).toBeInTheDocument();
    }
  });

  it("no longer renders the removed TEACHING entry", () => {
    render(<TopNav />);
    expect(within(desktopNav()).queryByText("TEACHING")).toBeNull();
  });
});

describe("TopNav — smooth-scroll anchors", () => {
  it("scrolls to the matching section id on click", async () => {
    const user = userEvent.setup();
    const music = addSection("music");
    const spy = vi.spyOn(music, "scrollIntoView").mockImplementation(() => {});

    render(<TopNav />);
    await user.click(within(desktopNav()).getByText("MUSIC"));

    expect(spy).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("scrolls to the top of the page for HOME", async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(<TopNav />);
    await user.click(within(desktopNav()).getByText("HOME"));

    expect(spy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});

describe("TopNav — mobile hamburger", () => {
  it("hides the menu until the hamburger is tapped", async () => {
    const user = userEvent.setup();
    render(<TopNav />);
    const mobile = within(mobileNav());

    expect(mobile.queryByText("HOME")).toBeNull();

    await user.click(mobile.getByRole("button", { name: "Open menu" }));
    expect(mobile.getByText("HOME")).toBeInTheDocument();
  });

  it("closes the menu after a section link is tapped", async () => {
    const user = userEvent.setup();
    const bio = addSection("bio");
    vi.spyOn(bio, "scrollIntoView").mockImplementation(() => {});

    render(<TopNav />);
    const mobile = within(mobileNav());

    await user.click(mobile.getByRole("button", { name: "Open menu" }));
    await user.click(mobile.getByText("ABOUT"));

    expect(mobile.queryByText("HOME")).toBeNull();
  });
});
