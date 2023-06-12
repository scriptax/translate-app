import { ReactElement, useState } from "react";
import icons from "../../misc/SVGs";

type props = {
  iconName: string,
  description: string,
  handler: () => undefined | void
}
function SquareBTN({iconName, handler, description}: props): ReactElement {
  let iconIndex = iconName as keyof object;
  const[tooltip, setTooltip] = useState<boolean>(false);

  return (
    <button 
      className={`relative border-none outline-none rounded-sm hover:bg-neutral-200 dark:hover:bg-slate-700 active:bg-neutral-300 dark:active:bg-slate-700 w-10 h-10 `} 
      onClick={handler}
      onMouseEnter={() => {setTooltip(true)}}
      onMouseLeave={() => {setTooltip(false)}}
    >
      {icons?.[iconIndex]}
      {tooltip && <span className={`z-40 whitespace-nowrap block absolute h-6 bg-neutral-700 text-white text-sm p-1 rounded-sm left-1/2 -bottom-8 -translate-x-1/2 dark:bg-slate-300 dark:text-black`}
      >
        {description}
      </span>}
    </button>
  );
}

export default SquareBTN;