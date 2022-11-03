import { FunctionComponent } from "react";
import { Event } from "../../../types/resolvers-types";

type EventsProps = {
  events: Event[]
}

export const Events: FunctionComponent<EventsProps> = ({ events }) => {
  return <div>Events</div>;
};
