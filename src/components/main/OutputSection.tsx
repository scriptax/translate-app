import { ReactElement } from "react";
import RoundBTN from "./RoundBTN";

function OutputSection(): ReactElement {
  return (
    <section className="p-3 min-h-[160px] min-h- w-full max-w-xl bg-neutral-100 dark:shadow-none rounded-b-md dark:bg-slate-800 border-t-4 border-dashed border-neutral-600 dark:border-white">
      <div className="flex justify-between">
        <div dir="auto" className="w-5/6 min-h-[120px] outline-none text-lg bg-transparent dark:text-white text-black resize-none ">
        </div>
        {/* <RoundBTN iconName="Close" description="Clear" handler={() => {}} /> Reserved */}
      </div>
      <div className="relative top-1 w-full flex justify-between items-center">
        <div>
          <RoundBTN iconName="Listen" description="Listen" handler={() => {}} />
          <RoundBTN iconName="Copy" description="Copy translation" handler={() => {}} />
        </div>
        {/* <div className="text-sm">
          1/2000
        </div> Reserved*/}
      </div>
    </section>
  );
}

export default OutputSection;