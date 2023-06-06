import { ReactElement, memo } from "react";
import icons from "../common/SVGs";

type props = {
  lang: string,
  active: boolean,
  prepLang: (e: React.MouseEvent<HTMLLIElement>) => void
};
function LangItem({lang, active, prepLang}: props): ReactElement {
  return (
    <li 
      className={`flex p-1 pl-2 items-center h-8 hover:bg-neutral-100 dark:hover:bg-slate-700 rounded-md cursor-pointer ${active && `bg-green-50 dark:border dark:border-green-300 dark:border-solid dark:bg-transparent`}`}
      onClick={prepLang}
    >
      {active && <span className="text-green-500 dark:text-green-300">
        {icons.Check}
      </span>}
      <span className="ml-2">{lang}</span>
    </li>
  );
}

export default memo(LangItem);