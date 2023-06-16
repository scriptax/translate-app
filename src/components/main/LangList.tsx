import { ReactElement, useState, useContext } from "react";
import icons from "../../misc/SVGs";
import RoundBTN from "../common/SquareBTN";
import LangItem from "./LangItem";
import { LangContext } from "./Main";
import languagesList from "../../data/langs";

type LanguagesType = {
  searchTerm: string;
  prepLang: (lang: { code: string; name: string }) => void;
  activeList: string;
};
const Languages = ({
  searchTerm,
  prepLang,
  activeList,
}: LanguagesType): ReactElement => {
  const { selectedLangs } = useContext(LangContext);
  const langs = languagesList.filter(([lang]) => {
    return lang.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <ul className="mt-4 flex w-full flex-wrap">
      {langs.map(([lang, langCode]) => {
        let active: boolean = selectedLangs.src.name === lang ? true : false;
        if (activeList === "src") {
          active = selectedLangs.src.name === lang ? true : false;
        } else {
          active = selectedLangs.dest.name === lang ? true : false;
        }
        return (
          <LangItem
            prepLang={() => {
              prepLang({ code: langCode, name: lang });
            }}
            active={active}
            lang={lang}
            key={langCode}
          />
        );
      })}
    </ul>
  );
};

type props = {
  closeLangs: () => void;
  prepLang: (lang: { code: string; name: string }) => void;
  activeList: string;
};
function LangList({ closeLangs, prepLang, activeList }: props): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="absolute left-[-2px] top-[-10px] z-20 max-h-[75vh] w-[100.8%] overflow-auto border border-solid border-neutral-300 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex h-10 w-full items-center justify-between">
        <div className="flex h-10 w-3/4 items-center rounded-md px-3 sm:w-2/4">
          <div className="mr-2">{icons.Search}</div>
          <input
            className="text-md w-full border-none bg-transparent pt-1 font-light outline-none"
            placeholder="Search languages"
            value={searchTerm}
            onChange={searchHandler}
            autoFocus
          />
        </div>
        <div>
          <RoundBTN description="Close" handler={closeLangs} iconName="Close" />
        </div>
      </div>
      <hr className="dark:border-slate-500" />
      <Languages
        activeList={activeList}
        prepLang={prepLang}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default LangList;
