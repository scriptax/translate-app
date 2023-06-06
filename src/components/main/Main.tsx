import { ReactElement, createContext, useState } from "react";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import LangSection from "./LangSection";

type LangContextType = {
  selectedLangs: {src: string, dest: string},
  setSelectedLangs: React.Dispatch<React.SetStateAction<{src: string, dest: string}>>
};
const LangContext = createContext<LangContextType>({
  selectedLangs: {src: "detect language", dest: "spanish"},
  setSelectedLangs: () => {}
});

function Main(): ReactElement {
  type LangStateType = {src: string, dest: string}
  const [selectedLangs, setSelectedLangs] = useState<LangStateType>({
    src: "detect language",
    dest: "spanish"
  });

  const langSetter = (lang: string) => {
    setSelectedLangs(prev => {
      return {...prev, dest: lang}; 
    });
  };
  console.log("LANGS", selectedLangs)
  return (
    <main className="m-auto w-full max-w-xl dark:bg-slate-900 dark:text-white px-4 sm:px-0">
      <LangContext.Provider value={{selectedLangs, setSelectedLangs}}>
        <LangSection setLang={langSetter} />
      </LangContext.Provider>
      <div className="relative w-full border-solid border-neutral-300 dark:border-slate-700 dark:border-2 border rounded-lg">
        <InputSection />
        <OutputSection />
      </div>
    </main>
  );
}

export {LangContext};
export default Main;