import { ReactElement, useState } from "react";
import icons from "../../misc/SVGs";

type Props = {
  iconName: string;
  description: string;
  handler: () => undefined | void;
};
function SquareBTN({ iconName, handler, description }: Props): ReactElement {
  let iconIndex = iconName as keyof object;
  const [tooltip, setTooltip] = useState<boolean>(false);
  return (
    <button
      className={`relative h-10 w-10 rounded-sm border-none outline-none hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-slate-700 dark:active:bg-slate-700 dark:text-white`}
      onClick={handler}
      onMouseEnter={() => {
        setTooltip(true);
      }}
      onMouseLeave={() => {
        setTooltip(false);
      }}
    >
      {icons?.[iconIndex]}
      {tooltip && (
        <span
          className={`absolute -bottom-8 left-1/2 z-40 block h-6 -translate-x-1/2 whitespace-nowrap rounded-sm bg-neutral-700 p-1 text-sm text-white dark:bg-slate-300 dark:text-black`}
        >
          {description}
        </span>
      )}
    </button>
  );
}

export default SquareBTN;
