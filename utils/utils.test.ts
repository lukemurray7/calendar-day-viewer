import { getGroupedEvents } from "./index";

describe("Get Grouped Events", () => {
  it("creates an array of event groups", () => {
    const events = [
      { start: 100, end: 200, id: "1", title: "My Event" },
      { start: 200, end: 300, id: "2", title: "My Event" },
      { start: 300, end: 400, id: "3", title: "My Event" },
      { start: 400, end: 500, id: "4", title: "My Event" },
      { start: 500, end: 600, id: "5", title: "My Event" },
    ];

    const expected = [
      [events[0]],
      [events[1]],
      [events[2]],
      [events[3]],
      [events[4]],
    ];

    expect(getGroupedEvents(events)).toEqual(expected);
  });
  
  it("groups events if they overlap", () => {
    const events = [
      { start: 100, end: 200, id: "1", title: "My Event" },
      { start: 150, end: 300, id: "2", title: "My Event" },
      { start: 300, end: 400, id: "3", title: "My Event" },
      { start: 400, end: 500, id: "4", title: "My Event" },
      { start: 500, end: 600, id: "5", title: "My Event" },
      { start: 500, end: 550, id: "6", title: "My Event" },
      { start: 520, end: 700, id: "7", title: "My Event" },
    ];

    const expected = [
      [events[0], events[1]],
      [events[2]],
      [events[3]],
      [events[4], events[5], events[6]],
    ];

    console.log(getGroupedEvents(events))
    expect(getGroupedEvents(events)).toEqual(expected);
  });
});
