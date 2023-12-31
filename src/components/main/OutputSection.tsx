import { ReactElement, useContext, useState } from "react";
import { TransContext } from "./Main";
import RoundBTN from "../common/SquareBTN";
import AlertBox, { useAlertTimer } from "../common/AlertBox";
import ToSpeech from "./ToSpeech";

function OutputSection(): ReactElement {
  const { translation } = useContext(TransContext);
  const [copyMessage, setCopyMessage] = useState<string>("");
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Translation copied!");
  };
  useAlertTimer(copyMessage, setCopyMessage);
  return (
    <section className="flex flex-col min-h-[200px] w-full max-w-xl border-t-4 border-dashed border-slate-600 bg-neutral-100 p-3 dark:border-slate-200 dark:bg-slate-800 dark:shadow-none">
      <div className="flex-grow flex justify-between">
        <div
          dir="auto"
          className="min-h-[120px] w-full resize-none break-words bg-transparent text-lg text-black outline-none dark:text-white "
        >
          {translation.output}
        </div>
      </div>
      <div className="relative top-1 flex w-full items-center justify-between">
        <div>
          {translation.output.length > 0 && (
            <>
              <RoundBTN
                iconName="Copy"
                description="Copy translation"
                handler={() => {
                  copyToClipboard(translation.output);
                }}
              />
              <ToSpeech role="dest" />
            </>
          )}
        </div>
      </div>
      <AlertBox text={copyMessage} />
    </section>
  );
}

export default OutputSection;
