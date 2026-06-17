import type { BookingRecord } from "@/types";
import { POPULAR_ROUTES } from "./airports";
import { AIRCRAFT_TYPES } from "@/lib/constants";

const CLASSES = ["Economy", "Business", "Premium Economy"];
const NAMES_PREFIX = ["6E", "AI", "QP", "SG"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateBookingId(): string {
  const prefix = randomItem(NAMES_PREFIX);
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

function generateBookings(count: number): BookingRecord[] {
  const records: BookingRecord[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const route = randomItem(POPULAR_ROUTES);
    const bookingClass = randomItem(CLASSES);
    const baseFare = bookingClass === "Business" ? 12000 + Math.random() * 8000
      : bookingClass === "Premium Economy" ? 7000 + Math.random() * 4000
      : 3000 + Math.random() * 5000;
    const passengers = Math.floor(1 + Math.random() * 3);
    const fare = Math.round(baseFare);
    const revenue = fare * passengers;
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    records.push({
      id: `rec-${i}`,
      bookingId: generateBookingId(),
      route: `${route.origin}-${route.destination}`,
      origin: route.origin,
      destination: route.destination,
      revenue,
      fare,
      loadFactor: Math.round(60 + Math.random() * 35),
      date: date.toISOString().split("T")[0],
      aircraft: randomItem(AIRCRAFT_TYPES),
      class: bookingClass,
      passengers,
    });
  }

  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const BOOKING_RECORDS = generateBookings(500);
