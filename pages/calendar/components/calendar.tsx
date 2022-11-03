import { FunctionComponent } from "react";

type Props = {
  children?: JSX.Element;
};

export const Calendar: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="flex h-full flex-col m-4 sm:m-16">
      <h1 className="ml-12 my-8 text-2xl font-bold">2nd November 2022</h1>
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <div className="flex w-full flex-auto">
          <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            <HourRows />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const HourRows = () => {
  const HOURS = [
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "13PM",
    "14PM",
    "15PM",
    "16PM",
    "17PM",
    "18PM",
    "19PM",
    "20PM",
    "21PM",
    "22PM",
    "23PM",
  ];
  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
      style={{ gridTemplateRows: "repeat(48, minmax(2.5rem, 1fr))" }}
    >
      <div ref={null} className="row-end-1 h-7"></div>
      {HOURS.map((hour) => (
        <>
          <div>
            <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              {hour}
            </div>
          </div>
          <div />
        </>
      ))}
    </div>
  );
};
