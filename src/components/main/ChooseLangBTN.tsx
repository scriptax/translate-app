import { ReactElement } from "react";
import icons from "../../misc/SVGs";

type props = {
  showList: () => void;
  btnLang: string;
};
function ChooseLangBTN({ showList, btnLang }: props): ReactElement {
  return (
    <button
      className="mx-2 flex h-12 w-3/5 items-center justify-center rounded-sm text-lg hover:bg-neutral-100 dark:hover:bg-slate-800 sm:h-10 sm:w-2/5"
      onClick={showList}
    >
      <span className="pr-2">{btnLang}</span>
      {icons.Chevron}
    </button>
  );
}

export default ChooseLangBTN;
