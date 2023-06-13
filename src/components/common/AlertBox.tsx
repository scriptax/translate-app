import { ReactElement, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type PropType = {
  children: ReactNode;
};
function AlertBox({ children }: PropType): ReactElement {
  return (
    <AnimatePresence>
      {children && (
        <motion.div
          className="fixed bottom-10 left-4 z-50 h-12 border border-green-400 bg-green-100 p-2 pt-3 text-lg text-black shadow-lg "
          initial={{ x: "-100vw" }}
          animate={{ x: "16px" }}
          exit={{ x: "-100vw" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AlertBox;
