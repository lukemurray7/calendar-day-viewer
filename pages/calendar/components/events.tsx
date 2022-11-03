import { FunctionComponent, useEffect, useState } from "react";
import { Event } from "../../../types/resolvers-types";
import { getGroupedEvents } from "../../../utils";

type EventsProps = {
  events: Event[];
  height: number;
};

type EventGroupProps = {
  events: Event[];
  heightPixelUnitsPerMinute: number;
};

const MINUTES_PER_DAY = 1440;

type EventProps = {
  event: Event;
  height: number;
  marginTop: number;
};

const EventComponent: FunctionComponent<EventProps> = ({
  event: { id, title },
  height,
  marginTop,
}) => {
  return (
    <div key={id} className="w-full grid" style={{ height, marginTop }}>
      <a
        href="#"
        className={`
          rounded-lg
          text-xs
          leading-5
          hover:bg-blue-100
          bg-blue-50
          h-full
          p-1
          border
        `}
      >
        <p className="font-semibold text-blue-700">{title}</p>
      </a>
    </div>
  );
};

const EventGroup: FunctionComponent<EventGroupProps> = ({
  events,
  heightPixelUnitsPerMinute,
}) => {
  const groupEventStartTime = events
    .map((event) => event.start)
    .sort((a, b) => a - b)[0];

  const groupMarginTopHeight = Math.round(
    groupEventStartTime * heightPixelUnitsPerMinute
  );

  return (
    <div
      className="absolute w-full flex flex-row"
      style={{
        marginTop: groupMarginTopHeight,
      }}
    >
      {events.map((event) => {
        const eventHeight = (event.end - event.start) * heightPixelUnitsPerMinute;
        const eventMarginTop =
          (event.start - groupEventStartTime) * heightPixelUnitsPerMinute;

        return (
          <EventComponent
            key={event.id}
            event={event}
            height={eventHeight}
            marginTop={eventMarginTop}
          />
        );
      })}
    </div>
  );
};

export const Events: FunctionComponent<EventsProps> = ({
  events,
  height,
}) => {
  const heightPixelUnitsPerMinute = height / MINUTES_PER_DAY;
  const eventGroups = getGroupedEvents(events);

  return (
    <div className="col-start-1 col-end-2 row-start-1 relative pt-2.5">
      {eventGroups.map((group) => {
        return (
          <EventGroup
            key={group[0].start}
            events={group}
            heightPixelUnitsPerMinute={heightPixelUnitsPerMinute}
          />
        );
      })}
    </div>
  );
};
