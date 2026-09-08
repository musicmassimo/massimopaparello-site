import { describe, it, expect } from "vitest"
import { FLAP_STAGGER, flapResolveMs } from "@/pages/Index"

// Pins the hero split-flap timing to the brief: fully resolves in 1.5-2.5s and
// adjacent letters land 30-60ms apart. Fails if the constants are retuned out
// of spec.
describe("split-flap timing", () => {
  const { first, last } = flapResolveMs("MASSIMO PAPARELLO".length)

  it("resolves within 1.5-2.5s", () => {
    expect(first).toBeGreaterThanOrEqual(1500)
    expect(last).toBeLessThanOrEqual(2500)
    expect(last).toBeGreaterThan(first)
  })

  it("staggers adjacent letters 30-60ms apart", () => {
    expect(FLAP_STAGGER * 1000).toBeGreaterThanOrEqual(30)
    expect(FLAP_STAGGER * 1000).toBeLessThanOrEqual(60)
  })
})
