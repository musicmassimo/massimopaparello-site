import { describe, it, expect } from "vitest";
import { toRouterBasename } from "@/lib/routerBasename";

describe("toRouterBasename", () => {
  it("passes the domain-root base through unchanged", () => {
    expect(toRouterBasename("/")).toBe("/");
  });

  it("strips the trailing slash Vite adds to a subfolder base", () => {
    // Regression: BrowserRouter basename="/preview/" fails React Router's
    // exact-prefix match against a URL of "/preview" (no slash), blanking
    // the whole app — so the HOME link (and every route) goes dead.
    expect(toRouterBasename("/preview/")).toBe("/preview");
  });

  it("handles a nested subfolder base", () => {
    expect(toRouterBasename("/staging/preview/")).toBe("/staging/preview");
  });

  it("leaves an already slash-less base alone", () => {
    expect(toRouterBasename("/preview")).toBe("/preview");
  });
});
