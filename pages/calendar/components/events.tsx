import { FunctionComponent, useEffect, useState } from "react";
import { Event } from "../../../types/resolvers-types";
import { getGroupedEvents } from "../../../utils";

type EventsProps = {
  events: Event[];
  height: number;
};

type EventGroupProps = {
  events: Event[];
  heightUnitsPerMinute: number;
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
        <p className="order-1 font-semibold text-blue-700">{title}</p>
      </a>
    </div>
  );
};

const EventGroup: FunctionComponent<EventGroupProps> = ({
  events,
  heightUnitsPerMinute,
}) => {
  const groupEventStartTime = events
    .map((event) => event.start)
    .sort((a, b) => a - b)[0];

  const groupMarginTopHeight = Math.round(
    groupEventStartTime * heightUnitsPerMinute
  );

  return (
    <div
      className="absolute leading-5 overflow-scroll w-full flex flex-row"
      style={{
        marginTop: groupMarginTopHeight,
      }}
    >
      {events.map((event) => {
        const eventHeight = (event.end - event.start) * heightUnitsPerMinute;
        const eventMarginTop =
          (event.start - groupEventStartTime) * heightUnitsPerMinute;

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
  const [eventGroups, setEventGroups] = useState<Event[][]>([]);

  useEffect(() => {
    setEventGroups(getGroupedEvents(events));
  }, [events]);

  const heightUnitsPerMinute = height / MINUTES_PER_DAY;

  return (
    <div className="col-start-1 col-end-2 row-start-1 relative pt-2.5">
      {eventGroups.map((group) => {
        return (
          <EventGroup
            key={group[0].start}
            events={group}
            heightUnitsPerMinute={heightUnitsPerMinute}
          />
        );
      })}
    </div>
  );
};
