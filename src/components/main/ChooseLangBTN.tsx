import { ReactElement } from "react";

function ChooseLangBTN(): ReactElement {
  return (
    <button className="w-2/5 h-10 rounded-md border font-bold border-neutral-300 hover:bg-neutral-100 dark:border-2 dark:border-slate-700 dark:hover:bg-slate-800">
      Detect Language
    </button>
  );
}

export default ChooseLangBTN;