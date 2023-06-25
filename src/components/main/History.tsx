import { ReactElement, useEffect, useState, useContext } from "react";
import { TransContext } from "./Main";
import SquareBTN from "../common/SquareBTN";
import Button from "../common/Button";
import icons from "../../misc/SVGs";

type HistItemsType = {
  src: string,
  dest: string,
  input: string,
  output: string,
}

type HistItemsPropsType = {
  item: HistItemsType;
}
const HistItem = ({item}: HistItemsPropsType): ReactElement => {
  return (
    <li className="w-full p-2 border-b dark:border-b-slate-500 break-words text-sm">
      <div className="flex items-center mb-4">{item.src} {icons.Right} {item.dest}</div>
      <div>{item.input}</div>
      <div dir="auto">{item.output}</div>
    </li>
  );
};

type HistListType = {
  histItems: HistItemsType[] | null,
}
const HistList = ({histItems}: HistListType): ReactElement => {
  return (
    <ul>
      {histItems && [...histItems].reverse().map((item, index): ReactElement => (
      <HistItem item={item} key={index} />
      ))}
    </ul>
  );
};

const EmptyMessage = (): ReactElement => {
  return (
    <div className="py-8 text-neutral-500 dark:text-slate-400 text-xl">
      Nothing here yet!<br />
      Your translation history appears here.
    </div>
  );
};

type PropsType = {
  showHist: boolean,
  showHistHandler: () => void,
}
function History({showHist, showHistHandler}: PropsType): ReactElement {
  const [histItems, setHistItems] = useState<HistItemsType[] | null>(null);
  const {translation} = useContext(TransContext);
  useEffect(() => {
    setHistItems(JSON.parse(localStorage.getItem("translateAppHist") as string));
  }, [translation.output]);
  const deleteHist = (): void => {
    localStorage.setItem("translateAppHist", "[]");
    setHistItems([]);
  };
  return (
    <>
    {showHist &&
      <section className="absolute left-[-2px] top-[-2px] z-20 max-h-[73vh] w-[100.8%] border border-solid border-neutral-300 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900 overflow-y-scroll scrollbar">
        <div className="flex h-10 mb-4 items-center justify-between rounded-md px-3">
          <Button text="Delete All" handler={deleteHist} />
          <SquareBTN iconName="Close" description="Close" handler={showHistHandler} />
        </div>
        <hr className="dark:border-slate-500" />
        <HistList histItems={histItems} />
        {histItems?.length === 0 && <EmptyMessage />}
      </section>}
    </>
  );
}

export default History;