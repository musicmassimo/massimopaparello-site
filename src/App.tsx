import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toRouterBasename } from "@/lib/routerBasename";

// The site is a single continuously-scrolling homepage: the hero plus Shows,
// Bio, Gallery, Music and Inquiries as anchor-scroll sections (see
// src/components/sections). Only "/" and the 404 catch-all remain as routes.
// Index is eagerly imported — it is the entry point and its intro is timed from
// first paint, so a Suspense fallback flash would be visible.
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// vite.config.ts's `base` — "/" in a normal build, "/preview/" when the
// Hostinger preview workflow sets VITE_BASE_PATH. Vite emits it with a
// trailing slash; React Router's `basename` must not have one. See
// toRouterBasename for why a stray slash renders the app blank at "/preview".
const ROUTER_BASENAME = toRouterBasename(import.meta.env.BASE_URL);

// Black rather than the browser default, so a chunk fetch doesn't flash white
// against this site's dark pages.
const RouteFallback = () => (
  <div style={{ minHeight: "100vh", background: "#000" }} />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={ROUTER_BASENAME}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
