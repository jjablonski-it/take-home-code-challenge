import React, { useEffect, useState } from "react";
import { CalendarEvent, getCalendarEvents } from "../api-client";
import { daySummary, getDatesForDays, getTotal } from "../utils/helpers";

const DATE_FORMAT = "YYYY-MM-DD";

export interface Summary {
  numberOfEvents: number;
  totalDuration: number;
  longestEvent: CalendarEvent | null;
}
export interface Day {
  date: string;
  summary: Summary;
}

const CalendarSummary: React.FunctionComponent = () => {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    (async () => {
      const dates = getDatesForDays(7);

      const datePromiseTuple: [string, Promise<CalendarEvent[]>][] = dates.map(
        (date) => {
          const dateString = date.format(DATE_FORMAT);
          return [dateString, getCalendarEvents(date.toDate())];
        }
      );

      for (const day of datePromiseTuple) {
        try {
          const [date, promise] = day;
          const result = await promise;

          setDays((currentDays) => [
            ...currentDays,
            { date, summary: daySummary(result) },
          ]);
        } catch (e) {}
      }
    })();
  }, []);

  const { longestEvent, numberOfEvents, totalDuration } = getTotal(days);

  return (
    <div>
      <h2>Calendar summary</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Number of events</th>
            <th>Total duration [min]</th>
            <th>Longest event</th>
          </tr>
        </thead>
        <tbody>
          {days.map(({ date, summary }) => {
            const { numberOfEvents, totalDuration, longestEvent } = summary;
            return (
              <tr key={date}>
                <td>{date}</td>
                <td>{numberOfEvents}</td>
                <td>{totalDuration}</td>
                <td>{longestEvent?.title}</td>
              </tr>
            );
          })}
          <tr className="total">
            <td>Total</td>
            <td>{numberOfEvents}</td>
            <td>{totalDuration}</td>
            <td>{longestEvent?.title}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CalendarSummary;
