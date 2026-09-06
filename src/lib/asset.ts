/**
 * Prefix a path to a file in /public with the app's base URL, so it
 * resolves correctly whether the site is served from the domain root
 * ("/") or a subfolder like the Hostinger /preview deploy ("/preview/").
 *
 * Vite's `base` config only rewrites asset URLs it bundles itself (JS/CSS
 * imports) — a plain string like "/images/foo.jpg" in JSX is not touched,
 * so every reference to a /public file needs to go through this helper
 * instead of a hardcoded leading-slash path.
 */
export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
