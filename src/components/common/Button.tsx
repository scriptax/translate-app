import { ReactElement } from "react";
import icons from "../../misc/SVGs";

type PropsType = {
  text: string;
  icon: string;
  handler: () => void;
};
function Button({ text, icon, handler }: PropsType): ReactElement {
  let iconKey = icon as keyof object;
  return (
    <button
      className="relative h-10 px-3 mx-1 rounded-lg bg-slate-200 outline-none hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500 flex items-center"
      onClick={handler}
    >
      <span>{icons[iconKey]}</span>
      <span className="ml-1">{text}</span>
    </button>
  );
}

export default Button;
