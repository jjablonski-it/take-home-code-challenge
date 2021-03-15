# Megaron take-home code challenge

Hi,

this challenge will test your knowledge of the basics of JS, TypeScript and React.

It shouldn't take more than an hour to complete.

## Context

There's a calendar service that exposes an API. The API lists all events scheduled for a given day. The
job of this app is to gather the event data, and present a summary to the user.

For this challenge you *don't* have to access the service via HTTP. We've provided a stub API client - details below.

### The API

`getCalendarEvents` is the only function in the API. You specify the day by passing a date. It returns a promise that
resolves to an array of `CalendarEvent` objects.

```ts
interface CalendarEvent {
  uuid: string;
  title: string;
  durationInMinutes: number;
}

function getCalendarEvents(day: Date): Promise<CalendarEvent[]>;
```

The API client is located under `src/api-client`. Please do not modify it.

## Your task

Implement the `CalendarSummary` view. It needs to display a table summarizing the events scheduled for the **next 7 days**
(including the current date). The summary consists of:

- Number of events on the given day.
- Total duration of all events on the given day (in minutes).
- Title of the longest event of the day.

The last row should show the same kind of summary for the entire week.

The table may look something like this:

| Date       | Number of events | Total duration [min] | Longest event |
| ---------- | ---------------: | -------------------: | ------------- |
| 2021-03-13 |                7 |                  321 | Lorem ipsum   |
| 2021-03-14 |                3 |                  123 | dolor sit     |
| ...        |              ... |                  ... | ...           |
| Total      |               26 |                 1230 | Lorem ipsum   |

## Setup

This repository already contains all the boilerplate you need. Use `npm install` to install the dependencies and `npm start` to run the application.

You may install additional npm packages if you need to.

## Requirements

- The app needs to start.
- The app needs to display the data, as described above.
- Make the code as clean and as readable as you can.

### Good luck!
