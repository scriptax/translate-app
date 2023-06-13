import { ReactElement, ReactNode } from "react";

type PropsType = {
  text: string,
  handler: () => void
}
function Button({text, handler}: PropsType): ReactElement {
  return (
    <button 
      className=" relative h-10 w-24 border border-solid border-green-300 bg-green-50 pt-1 text-lg font-light outline-none hover:bg-green-300 dark:bg-transparent dark:text-green-300 dark:hover:bg-green-300 dark:hover:text-slate-900"
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default Button;