import { ReactElement, useState, useContext } from "react";
import icons from "../../misc/SVGs";
import RoundBTN from "./SquareBTN";
import LangItem from "./LangItem";
import { LangContext } from "./Main";
import languagesList from "../../data/langs";

type LanguagesType = {
  searchTerm: string,
  prepLang: (lang: {code: string, name: string}) => void,
  activeList: string
};
const Languages = ({searchTerm, prepLang, activeList}: LanguagesType): ReactElement => {
  const {selectedLangs} = useContext(LangContext);
  const langs = languagesList.filter(([lang]) => {
    return lang.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <ul className="w-full mt-4 flex flex-wrap">
    {
      langs.map(([lang, langCode]) => {
        let active: boolean = selectedLangs.src.name === lang ? true : false;
        if(activeList === "src") {
          active = selectedLangs.src.name === lang ? true : false;
        } else {
          active = selectedLangs.dest.name === lang ? true : false;
        }
        return <LangItem prepLang={() => {prepLang({code: langCode, name: lang})}} active={active} lang={lang} key={langCode} />
      })
    }
    </ul>
  );
};

type props = {
  closeLangs: () => void,
  prepLang: (lang: {code: string, name: string}) => void,
  activeList: string
}
function LangList({closeLangs, prepLang, activeList}: props): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="w-[100.8%] max-h-[75vh] overflow-auto shadow-xl border border-solid border-neutral-300 dark:border-slate-700 z-20 p-3 absolute left-[-2px] top-[-10px] bg-white dark:bg-slate-900">
      <div className="flex h-10 w-full justify-between items-center mb-3">
        <div className="flex items-center w-3/4 sm:w-2/4 h-10 px-3 rounded-md">
          <div className="mr-2">
            {icons.Search}
          </div>
          <input 
            className="border-none outline-none text-md font-light pt-1 bg-transparent w-full"
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
      <Languages activeList={activeList} prepLang={prepLang} searchTerm={searchTerm}/>
    </div>
  );
}

export default LangList;