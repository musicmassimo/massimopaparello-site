// Single source of truth for every Massimo Paparello show listing.
//
// Every entry that used to live here (Metro City, Harbor District, The Velvet
// Hour, etc.) was fabricated placeholder content from the original template and
// has been removed. Only real, booked dates belong here; the Live page renders
// an honest "no shows" state whenever this array is empty.

export type ShowStatus = "upcoming" | "past";
export type ShowType = "personal" | "syndicate";

export interface Show {
  date: string;
  /** Optional start time, e.g. "1:00 PM". */
  time?: string;
  venue: string;
  city: string;
  /** Optional free-text note — support acts, co-bills, "sold out", etc. */
  note?: string;
  status: ShowStatus;
  type: ShowType;
  /** Optional ticketing URL — the Live page shows a "GET TICKETS" CTA when set. */
  ticketLink?: string;
  /** Optional image shown as a background when the row is hovered. Must be a
   *  real photo Massimo uploaded (e.g. "/images/massimo-01.jpg") — never a
   *  stock or placeholder image. */
  image?: string;
}

export const shows: Show[] = [
  {
    date: "September 20, 2026",
    time: "1:00 PM",
    venue: "Hacienda Playa",
    city: "",
    note: "with The Get Down",
    status: "upcoming",
    type: "personal",
  },
];
