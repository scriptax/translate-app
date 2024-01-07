import { ReactElement, memo } from "react";
import icons from "../../misc/SVGs";

type props = {
  lang: string;
  active: boolean;
  prepLang: () => void;
};
function LangItem({ lang, active, prepLang }: props): ReactElement {
  return (
    <li
      className={`flex h-8 w-1/2 cursor-pointer rounded-md items-center p-1 pl-2 text-sm hover:bg-neutral-100 dark:hover:bg-slate-700 sm:w-1/3 ${
        active && `bg-gray-100 dark:bg-slate-600`
      }`}
      onClick={prepLang}
    >
      {active && (
        <span className="text-blue-800 dark:text-blue-200">{icons.Check}</span>
      )}
      <span className="ml-1 mt-1">{lang}</span>
    </li>
  );
}

export default memo(LangItem);
