export interface CalendarEvent {
    uuid: string;
    title: string;
    durationInMinutes: number;
}
export declare function getCalendarEvents(date: Date): Promise<CalendarEvent[]>;
export default getCalendarEvents;
