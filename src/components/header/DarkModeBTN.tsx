import { ReactElement, useState, useEffect } from "react";
import { motion } from "framer-motion";
import icons from "../../misc/SVGs";

type ModeIconProps = {
  iconName: string,
}
const ModeIcon = ({iconName}: ModeIconProps): ReactElement => {
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
      className="relative ml-3 h-10 w-10 overflow-hidden border border-solid border-green-300 bg-green-50 outline-none hover:bg-green-300 dark:bg-transparent dark:text-green-300 dark:hover:bg-green-300 dark:hover:text-slate-900"
      onClick={darkModeHandler}
    >
      {darkMode && <ModeIcon iconName="Sun" />}
      {!darkMode && <ModeIcon iconName="Moon" />}
    </button>
  );
};

export default DarkModeBTN;
