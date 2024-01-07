import { ReactElement, useState, useEffect } from "react";
import { motion } from "framer-motion";
import icons from "../../misc/SVGs";

type ModeIconProps = {
  iconName: string;
};
const ModeIcon = ({ iconName }: ModeIconProps): ReactElement => {
  let iconIndex = iconName as keyof object;
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      initial={{ x: "-10vw", translate: "-50% -50%" }}
      animate={{ x: "0" }}
    >
      {icons[iconIndex]}
    </motion.div>
  );
};

function DarkModeBTN(): ReactElement {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const darkModeHandler = (): void => {
    setDarkMode((prev) => !prev);
  };
  useEffect(() => {
    document.body.parentElement?.classList[darkMode ? "add" : "remove"]("dark");
  }, [darkMode]);
  return (
    <button
      className="relative ml-1 h-10 w-10 overflow-hidden rounded-lg outline-none bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500 "
      onClick={darkModeHandler}
    >
      {!darkMode && <ModeIcon iconName="Sun" />}
      {darkMode && <ModeIcon iconName="Moon" />}
    </button>
  );
}

export default DarkModeBTN;
