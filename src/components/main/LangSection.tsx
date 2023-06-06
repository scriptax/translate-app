import { ReactElement, useContext, useState } from "react";
import ChooseLangBTN from "./ChooseLangBTN";
import RoundBTN from "./RoundBTN";
import LangList from "./LangList";
import { LangContext } from "./Main";

type props = {
  setLang: (lang: string, src: string) => void
}
function LangSection({setLang}: props): ReactElement {
  const {selectedLangs, setSelectedLangs} = useContext(LangContext);
  const [activeList, setActiveList] = useState<"src" | "dest" | null>(null);
  const selectLang = (): void => {

  };
  const prepLang = (e: React.MouseEvent<HTMLLIElement>): void => {
    let elem = e.target as HTMLLIElement;
    let lang: string = elem.innerText;
    activeList === "src" ? 
    setSelectedLangs(prev => ({...prev, src: lang})) : 
    setSelectedLangs(prev => ({...prev, dest: lang}))
    setActiveList(null);
  };

  const swapLang = (): void => {
    setSelectedLangs(prev => {
      return {src: prev.dest, dest: prev.src};
    });
  };
  return (
    <div className="relative mb-3 flex justify-between w-full">
      <ChooseLangBTN btnLang={selectedLangs.src} showList={() => {setActiveList("src")}} />
      <RoundBTN iconName="Swap" description="Change direction" handler={swapLang} />
      <ChooseLangBTN btnLang={selectedLangs.dest} showList={() => {setActiveList("dest")}} />
      {activeList && <LangList activeList={activeList} prepLang={prepLang} closeLangs={() => {setActiveList(null)}}/>}
    </div>
  );
}

export default LangSection;