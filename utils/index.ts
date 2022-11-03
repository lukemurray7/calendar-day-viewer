import { Event } from "../types/resolvers-types";

const isOverlappingEvent = (
  start: number,
  end: number,
  nextEventStart: number
) => {
  return nextEventStart >= start && nextEventStart < end;
};

/**
 * 
 * @param events Event[]
 * @returns Event[][]
 * 
 * Returns an array of grouped events. Any events that overlap will appear in the same group
 */
export const getGroupedEvents = (events: Event[]) => events.reduce((groupedEvents: Event[][], nextEvent: Event) => {
  let nextEventAdded = false;

  const newGroupedEvents = groupedEvents.map((group) => {
    let newGroup = [...group];
    group.forEach((event) => {
      if (isOverlappingEvent(event.start, event.end, nextEvent.start)) {
        nextEventAdded = true;
        newGroup = [...group, nextEvent];
      }
    });
    return newGroup;
  });

  if (!nextEventAdded) {
    return [...newGroupedEvents, [nextEvent]];
  }

  return newGroupedEvents;
}, []);
