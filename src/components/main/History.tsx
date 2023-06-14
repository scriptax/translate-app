import { ReactElement, useEffect, useState } from "react";
import SquareBTN from "../common/SquareBTN";
import Button from "../common/Button";
import icons from "../../misc/SVGs";

type HistItemsType = {
  src: string,
  dest: string,
  input: string,
  output: string,
}
type HistElemType = {
  histItems: HistItemsType[] | null,
  setHistItems: React.Dispatch<React.SetStateAction<HistItemsType[] | null>>
}
const HistElem = ({histItems, setHistItems}: HistElemType): ReactElement => {
  useEffect(() => {
    setHistItems(JSON.parse(localStorage.getItem("translateAppHist") as string));
  }, []);
  return(
    <ul>
      {
      histItems && histItems.map((item, index): ReactElement => (
        <li className="w-full p-2 border-b dark:border-b-slate-500 text-sm" key={index}>
          <div className="flex items-center mb-4">{item.src} {icons.Right} {item.dest}</div>
          <div>{item.input}</div>
          <div>{item.output}</div>
        </li>
      ))
      }
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
  const deleteHist = (): void => {
    localStorage.setItem("translateAppHist", "[]");
    setHistItems([]);
  };
  return (
    <>
    {showHist &&
      <section className="absolute left-[-2px] top-[-2px] z-20 max-h-[73vh] w-[100.8%] border border-solid border-neutral-300 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900 overflow-y-scroll">
        <div className="flex h-10 mb-6 items-center justify-between rounded-md px-3">
          <Button text="Delete All" handler={deleteHist} />
          <SquareBTN iconName="Close" description="Close" handler={showHistHandler} />
        </div>
        <hr className="dark:border-slate-500" />
        <HistElem histItems={histItems} setHistItems={setHistItems}/>
        {histItems?.length === 0 && <EmptyMessage />}
      </section>
    }
    </>
  );
}

export default History;