import React, { ReactNode, createContext, useState } from "react";

type TransStateType = { input: string; output: string };

interface TransContextType<T> {
  translation: T;
  setTranslation: React.Dispatch<React.SetStateAction<T>>;
}

export const TransContext = createContext<TransContextType<TransStateType>>({
  translation: { input: "", output: "" },
  setTranslation: () => {},
});

export default function TransProvider({ children }: { children: ReactNode }) {
  const [translation, setTranslation] = useState<TransStateType>({
    input: "",
    output: "",
  });
  return (
    <TransContext.Provider value={{ translation, setTranslation }}>
      {children}
    </TransContext.Provider>
  );
}
