import { ReactElement } from "react";
import icons from "../../misc/SVGs";

type props = {
  showList: () => void,
  btnLang: string
}
function ChooseLangBTN({showList, btnLang}: props): ReactElement {
  return (
    <button 
    className="flex items-center justify-center w-3/5 sm:w-2/5 h-12 mx-2 sm:h-10 rounded-sm hover:bg-neutral-100 text-lg dark:hover:bg-slate-800"
    onClick={showList}
    >
      <span className="pr-2">{btnLang}</span>
      {icons.Chevron}
    </button>
  );
}

export default ChooseLangBTN;