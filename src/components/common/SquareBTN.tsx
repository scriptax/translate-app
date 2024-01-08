import { ReactElement, useState } from "react";
import icons from "../../misc/SVGs";

type Props = {
  iconName: string;
  description?: string;
  handler: () => undefined | void;
};
function SquareBTN({ iconName, handler, description }: Props): ReactElement {
  let iconIndex = iconName as keyof object;
  const [tooltip, setTooltip] = useState<boolean>(false);
  return (
    <button
      className={`relative h-10 w-10 rounded-md border-none outline-none hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-slate-700 dark:active:bg-slate-700 dark:text-white`}
      onClick={handler}
      onMouseEnter={() => {
        setTooltip(true);
      }}
      onMouseLeave={() => {
        setTooltip(false);
      }}
    >
      {icons?.[iconIndex]}
      {tooltip && description && (
        <span
          className={`absolute -bottom-8 left-1/2 z-40 block -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-700 p-1 text-xs text-white dark:bg-gray-300 dark:text-black`}
        >
          {description}
        </span>
      )}
    </button>
  );
}

export default SquareBTN;
