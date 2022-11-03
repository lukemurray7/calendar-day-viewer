import useSWR from "swr";

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

export default function Index() {
  const { data, error } = useSWR(
    "{ events { id, title, start, end } }",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { events } = data;

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
