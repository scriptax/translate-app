import { ReactElement, useContext, useState } from "react";
import ChooseLangBTN from "./ChooseLangBTN";
import RoundBTN from "../common/SquareBTN";
import LangList from "./LangList";
import { LangContext, TransContext } from "./Main";

function LangSection(): ReactElement {
  const { selectedLangs, setSelectedLangs } = useContext(LangContext);
  const { setTranslation } = useContext(TransContext);
  const [activeList, setActiveList] = useState<"src" | "dest" | null>(null);
  const prepLang = (lang: { code: string; name: string }): void => {
    activeList === "src"
      ? setSelectedLangs((prev) => ({ ...prev, src: lang }))
      : setSelectedLangs((prev) => ({ ...prev, dest: lang }));
    setActiveList(null);
  };
  const swapLang = (): void => {
    setSelectedLangs((prev) => {
      return { src: prev.dest, dest: prev.src };
    });
    setTranslation((prev) => {
      return { input: prev.output, output: "" };
    });
  };
  return (
    <div className="relative my-2 flex w-full justify-between">
      <ChooseLangBTN
        btnLang={selectedLangs.src.name}
        showList={() => {
          setActiveList("src");
        }}
      />
      <RoundBTN
        iconName="Swap"
        description="Change direction"
        handler={swapLang}
      />
      <ChooseLangBTN
        btnLang={selectedLangs.dest.name}
        showList={() => {
          setActiveList("dest");
        }}
      />
      {activeList && (
        <LangList
          activeList={activeList}
          prepLang={prepLang}
          closeLangs={() => {
            setActiveList(null);
          }}
        />
      )}
    </div>
  );
}

export default LangSection;
