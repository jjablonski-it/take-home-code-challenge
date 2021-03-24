import moment from "moment";
import { CalendarEvent } from "../api-client";
import { Day, Summary } from "../CalendarSummary";

const defaultSummary = {
  numberOfEvents: 0,
  longestEvent: null,
  totalDuration: 0,
};

const longerEvent = (a: CalendarEvent | null, b: CalendarEvent | null) => {
  if (!a) return b;
  if (b && b.durationInMinutes > a.durationInMinutes) return b;
  return a;
};

export const getDatesForDays = (days: number) => {
  return Array.from({ length: days }, (_, day) => {
    return moment().add(day, "day");
  });
};

export const daySummary = (day: CalendarEvent[]) =>
  day.reduce<Summary>(
    (total, event) => {
      total.numberOfEvents++;
      total.totalDuration += event.durationInMinutes;

      total.longestEvent = longerEvent(event, total.longestEvent);

      return total;
    },
    { ...defaultSummary }
  );

export const getTotal = (days: Day[]) =>
  days.reduce<Summary>(
    (total, day) => {
      total.numberOfEvents += day.summary.numberOfEvents;
      total.totalDuration += day.summary.totalDuration;

      total.longestEvent = longerEvent(
        total.longestEvent,
        day.summary.longestEvent
      );

      return total;
    },
    {
      ...defaultSummary,
    }
  );
