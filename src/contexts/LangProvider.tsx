import { ReactNode, createContext, useState } from "react";

type LangStateType = {
  src: { code: string; name: string };
  dest: { code: string; name: string };
};

interface LangContextType<T> {
  selectedLangs: T;
  setSelectedLangs: React.Dispatch<React.SetStateAction<T>>;
}

export const LangContext = createContext<LangContextType<LangStateType>>({
  selectedLangs: {
    src: { code: "en", name: "English" },
    dest: { code: "es", name: "Spanish" },
  },
  setSelectedLangs: () => {},
});

export default function LangProvider({ children }: { children: ReactNode }) {
  const [selectedLangs, setSelectedLangs] = useState<LangStateType>({
    src: { code: "en", name: "English" },
    dest: { code: "es", name: "Spanish" },
  });
  return (
    <LangContext.Provider value={{ selectedLangs, setSelectedLangs }}>
      {children}
    </LangContext.Provider>
  );
}
