import useSWR from "swr";
import { Event } from "../types/resolvers-types";

const fetcher = (query: string) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function CalendarPage() {
  const { data, error } = useSWR<{ events: Event[] }>(
    "{ events { id, title, start, end } }",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { events } = data;
    console.log(events)
  return (
    <div>
      {events.map((event) => (
        <>
          <div>{event.title}</div>
          <div>
            {event.start} - {event.end}
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}
