import { ReactElement } from "react";
import { motion } from "framer-motion";
import icons from "../common/SVGs";

type darkModeBTNProps = {
  darkModeHandler: () => void,
  darkMode: boolean
};
const DarkModeBTN = ({ darkModeHandler, darkMode }: darkModeBTNProps): ReactElement => {
  return (
    <button
      className="relative ml-3 h-10 w-10 overflow-hidden rounded-e rounded-s border border-solid border-green-300 bg-green-50 outline-none hover:bg-green-300 dark:bg-transparent dark:text-green-300 dark:hover:bg-green-300 dark:hover:text-slate-900"
      onClick={darkModeHandler}
    >
      {darkMode && <motion.div 
        className="absolute left-1/2 top-1/2"
        initial={{x: "-10vw", translate: "-50% -50%"}}
        animate={{x: "0"}}
      >
        {icons?.Sun}
      </motion.div>}
      {!darkMode && <motion.div 
        className="absolute left-1/2 top-1/2"
        initial={{x: "-10vw", translate: "-50% -50%"}}
        animate={{x: "0"}}
      >
        {icons.Moon}
      </motion.div>}
    </button>
  );
};

export default DarkModeBTN;