import { ReactElement, useState, useContext } from "react";
import icons from "../common/SVGs";
import RoundBTN from "./RoundBTN";
import LangItem from "./LangItem";
import { LangContext } from "./Main";

type props = {
  closeLangs: () => void,
  prepLang: (e: React.MouseEvent<HTMLLIElement>) => void,
  activeList: string
}
function LangList({closeLangs, prepLang, activeList}: props): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {selectedLangs} = useContext(LangContext);
  const [langs, setLangs] = useState<object[]>();
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="w-[100.8%] max-h-[600px] overflow-auto rounded-md shadow-xl border dark:border-2 border-solid border-neutral-300 dark:border-slate-700 z-20 p-3 absolute left-[-2px] top-[-2px] bg-white dark:bg-slate-900">
      <div className="flex h-10 w-full justify-between items-center mb-3">
        <div className="flex items-center w-3/4 sm:w-2/4 h-10 px-3 rounded-md">
          <div className="mr-2">
            {icons.Search}
          </div>
          <input 
            className="border-none outline-none text-md bg-transparent w-full"
            placeholder="Search languages"
            value={searchTerm}
            onChange={searchHandler}
          />
        </div>
        <div>
          <RoundBTN description="Close" handler={closeLangs} iconName="Close" />
        </div>
      </div>
      <hr className="dark:border-slate-500"/>
      <ul className="w-full mt-4 sm:columns-3 columns-2 sm:gap-6 gap-2">
        {["english", "chinese", "Polish", "German", "Persian", "French", "Spanish","english", "chinese", "Polish", "German", "Persian", "French", "Spanish","english", "chinese", "Polish", "German", "Persian", "French", "Spanish","english", "chinese", "Polish", "German", "Persian", "French", "Spanish"].map((lang, index): ReactElement => {
          let active: boolean = selectedLangs.src === lang ? true : false;
          if(activeList === "src") {
            active = selectedLangs.src === lang ? true : false;
          } else {
            active = selectedLangs.dest === lang ? true : false;
          }
          return <LangItem prepLang={prepLang} active={active} lang={lang} key={index} />
        })}
      </ul>
    </div>
  );
}

export default LangList;