import { ReactElement, useContext, useEffect, useState } from "react";
import RoundBTN from "./SquareBTN";
import { TransContext } from "./Main";
import AlertBox from "../common/AlertBox";
import ToSpeech from "./ToSpeech";

function OutputSection(): ReactElement {
  const {translation} = useContext(TransContext);
  const [copyMessage, setCopyMessage] = useState<string>("");
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Translation copied!");
  };
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if(copyMessage) {
      timer = setTimeout(() => {
        setCopyMessage("");
      }, 2000);
    }
    return () => {
      clearTimeout(timer)
    };
  }, [copyMessage]);
  return (
    <section className="p-3 min-h-[180px] min-h- w-full max-w-xl bg-neutral-100 dark:shadow-none dark:bg-slate-800 border-t-4 border-dashed border-slate-600 dark:border-slate-200">
      <div className="flex justify-between">
        <div dir="auto" className="w-full break-words min-h-[120px] outline-none text-lg bg-transparent dark:text-white text-black resize-none ">
          {translation.output}
        </div>
        {/* <RoundBTN iconName="Close" description="Clear" handler={() => {}} /> Reserved */}
      </div>
      <div className="relative top-1 w-full flex justify-between items-center">
        <div>
          {translation.output.length > 0 && (
            <>
            <RoundBTN iconName="Copy" description="Copy translation" handler={() => {copyToClipboard(translation.output)}} />
            <ToSpeech role="dest" />
            </>
          )}
        </div>
      </div>
      <AlertBox>{copyMessage}</AlertBox>
    </section>
  );
}

export default OutputSection;