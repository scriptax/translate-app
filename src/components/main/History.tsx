import { ReactElement, useEffect, useState, useContext } from "react";
import { TransContext } from "./../../contexts/TransProvider";
import SquareBTN from "../common/SquareBTN";
import Button from "../common/Button";
import icons from "../../misc/SVGs";

type HistItemsType = {
  src: string;
  dest: string;
  input: string;
  output: string;
};

type HistItemsPropsType = {
  item: HistItemsType;
};
const HistItem = ({ item }: HistItemsPropsType): ReactElement => {
  return (
    <li className="w-full p-2 border-b dark:border-b-slate-500 break-words text-sm">
      <div className="flex items-center mb-4">
        {item.src} {icons.Right} {item.dest}
      </div>
      <p>{item.input}</p>
      <p dir="auto">{item.output}</p>
    </li>
  );
};

type HistListType = {
  histItems: HistItemsType[] | null;
};
const HistList = ({ histItems }: HistListType): ReactElement => {
  return (
    <ul>
      {histItems &&
        [...histItems]
          .reverse()
          .map(
            (item, index): ReactElement => <HistItem item={item} key={index} />,
          )}
    </ul>
  );
};

const EmptyMessage = (): ReactElement => {
  return (
    <div className="text-neutral-500 dark:text-slate-400 w-full text-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="mx-auto my-4 w-14">{icons.History}</div>
      <p>Nothing here yet!</p>
      <p>Your translation history shows up here.</p>
    </div>
  );
};

type PropsType = {
  showHist: boolean;
  showHistHandler: () => void;
};
function History({ showHist, showHistHandler }: PropsType): ReactElement {
  const [histItems, setHistItems] = useState<HistItemsType[] | null>(null);
  const { translation } = useContext(TransContext);
  useEffect(() => {
    setHistItems(
      JSON.parse(localStorage.getItem("translateAppHist") as string),
    );
  }, [translation.output]);
  const deleteHist = (): void => {
    localStorage.setItem("translateAppHist", "[]");
    setHistItems([]);
  };
  return (
    <>
      {showHist && (
        <section className="absolute left-[-2px] top-[-2px] z-20 h-[73vh] w-[100.8%] border border-solid border-neutral-300 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900 overflow-y-scroll scrollbar">
          <div className="flex items-center justify-between rounded-md px-3">
            <strong>Translation History</strong>
            <SquareBTN
              iconName="Close"
              description="Close"
              handler={showHistHandler}
            />
          </div>
          <div className="my-2">
            <Button text="Clear All" handler={deleteHist} icon="Trash" />
          </div>
          <hr className="dark:border-slate-500" />
          <HistList histItems={histItems} />
          {histItems?.length === 0 && <EmptyMessage />}
        </section>
      )}
    </>
  );
}

export default History;
