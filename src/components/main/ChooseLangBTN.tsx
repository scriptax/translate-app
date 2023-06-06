import { ReactElement } from "react";

type props = {
  showList: () => void,
  btnLang: string
}
function ChooseLangBTN({showList, btnLang}: props): ReactElement {
  return (
    <button 
    className="w-3/5 sm:w-2/5 h-12 sm:h-10 rounded-md border font-bold border-neutral-300 hover:bg-neutral-100 dark:border-2 dark:border-slate-700 dark:hover:bg-slate-800"
    onClick={showList}
    >
      {btnLang}
    </button>
  );
}

export default ChooseLangBTN;