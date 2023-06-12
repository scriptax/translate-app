import { ReactElement, ReactNode} from "react";
import { AnimatePresence, motion } from "framer-motion";

type PropType = {
  children: ReactNode,
}
function AlertBox({children}: PropType): ReactElement {
  return (
    <AnimatePresence>
      {children && <motion.div 
        className="h-12 fixed left-4 bottom-10 z-50 p-2 pt-3 text-lg text-black bg-green-100 border border-green-400 shadow-lg "
        initial={{x: "-50vw"}}
        animate={{x: "16px"}}
        exit={{x: "-50vw"}}
      >
        {children}
      </motion.div>}
    </AnimatePresence>
  );
}

export default AlertBox;