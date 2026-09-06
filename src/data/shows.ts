// Single source of truth for every Massimo Paparello show listing.
//
// Intentionally empty — every entry that used to live here (Metro City,
// Harbor District, The Velvet Hour, etc.) was fabricated placeholder content
// from the original template, not real tour data. Add real shows here as
// they're booked; the Live page renders an honest "no shows" state when
// this array is empty.

export type ShowStatus = "upcoming" | "past";
export type ShowType = "personal" | "syndicate";

export interface Show {
  date: string;
  venue: string;
  city: string;
  status: ShowStatus;
  type: ShowType;
  /** Optional ticketing URL — the Live page shows a "GET TICKETS" CTA when set. */
  ticketLink?: string;
  /** Optional image shown as a background when the row is hovered. Must be a
   *  real photo Massimo uploaded (e.g. "/images/massimo-01.jpg") — never a
   *  stock or placeholder image. */
  image?: string;
}

export const shows: Show[] = [];
