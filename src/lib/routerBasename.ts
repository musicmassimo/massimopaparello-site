/**
 * Turn Vite's `import.meta.env.BASE_URL` into a value safe to hand to
 * React Router's <BrowserRouter basename>.
 *
 * Vite always emits BASE_URL with a trailing slash ("/" at the domain root,
 * "/preview/" for the Hostinger subfolder deploy). React Router matches
 * `basename` as an exact string prefix of the URL path, and its own docs say
 * the value must NOT end in a slash: with basename "/preview/", a visit to
 * "/preview" (no trailing slash — e.g. before the host's canonical-slash
 * redirect, or a hand-typed link) fails the prefix check, so <Routes>
 * matches nothing and the whole app renders blank. A slash-less "/preview"
 * matches "/preview", "/preview/" and "/preview/anything" alike.
 *
 * The domain-root case stays "/" — React Router's sentinel for "no basename".
 */
export const toRouterBasename = (baseUrl: string) =>
  baseUrl === "/" ? "/" : baseUrl.replace(/\/+$/, "");
