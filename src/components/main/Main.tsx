import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { TransContext } from "../../contexts/TransProvider";
import { LangContext } from "../../contexts/LangProvider";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import LangSection from "./LangSection";
import AlertBox from "../common/AlertBox";
import History from "./History";
import Saved from "./Saved";

type PropsType = {
  showHist: boolean;
  showSaved: boolean;
  showHistHandler: () => void;
  showSavedHandler: () => void;
};
export default function Main({
  showHist,
  showSaved,
  showHistHandler,
  showSavedHandler,
}: PropsType): ReactElement {
  const { translation, setTranslation } = useContext(TransContext);
  const { selectedLangs, setSelectedLangs } = useContext(LangContext);
  const [netAlert, setNetAlert] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const firstRender = useRef<boolean>(true);

  const fetchTranslation = async () => {
    let langpair = selectedLangs.src.code + "|" + selectedLangs.dest.code;
    let text = encodeURIComponent(translation.input);
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${langpair}`;
    try {
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        let translate = await data.responseData.translatedText;
        setTranslation((prev) => {
          return { ...prev, output: decodeHTML(translate) };
        });
        setLoading(false);
      } else {
        throw new Error(`Something went wrong: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const decodeHTML = (txt: string): string => {
    const dummyElem = document.createElement("textarea");
    dummyElem.innerHTML = txt;
    return dummyElem.value;
  };

  // a second alternative is using useDebounce hook in use-debounce package
  let timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (translation.input.length > 0 && !netAlert) {
        setLoading(true);
        fetchTranslation();
      } else {
        setTranslation((prev) => {
          return { ...prev, output: "" };
        });
      }
    }, 1000);
  }, [
    translation.input,
    selectedLangs.src.code,
    selectedLangs.dest.code,
    netAlert,
  ]);

  useEffect(() => {
    if (!localStorage.getItem("translateAppHist")) {
      localStorage.setItem("translateAppHist", JSON.stringify([]));
    }
    if (translation.input.length > 0) {
      const histData = JSON.parse(
        localStorage.getItem("translateAppHist") as string,
      );
      histData.push({
        src: selectedLangs.src.name,
        dest: selectedLangs.dest.name,
        input: translation.input,
        output: translation.output,
      });
      localStorage.setItem("translateAppHist", JSON.stringify(histData));
    }
  }, [translation.output]);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem("translateAppLang", JSON.stringify(selectedLangs));
    }
    firstRender.current = false;
  }, [selectedLangs.src.name, selectedLangs.dest.name]);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setNetAlert("Check your Internet connection!");
    });
    window.addEventListener("online", () => {
      setNetAlert("");
    });

    const langHist = JSON.parse(
      localStorage.getItem("translateAppLang") as string,
    );
    if (langHist) {
      setSelectedLangs(langHist);
    }
  }, []);
  return (
    <main className="flex-grow mx-auto w-[93%] max-w-xl">
      <section className="relative w-full border  bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-white">
        <History showHist={showHist} showHistHandler={showHistHandler} />
        {/* <Saved showSaved={showSaved} showSavedHandler={showSavedHandler} /> */}
        <LangSection />
        <div className="relative w-full border-t border-neutral-300 dark:border-slate-700">
          <InputSection loading={loading} />
          <OutputSection />
        </div>
        <AlertBox text={netAlert} />
      </section>
    </main>
  );
}
