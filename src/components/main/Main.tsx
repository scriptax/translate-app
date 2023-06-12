import { ReactElement, createContext, useEffect, useRef, useState } from "react";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import LangSection from "./LangSection";
import AlertBox from "../common/AlertBox";

type LangContextType = {
  selectedLangs: {src: {code: string, name: string}, dest: {code: string, name: string}},
  setSelectedLangs: React.Dispatch<React.SetStateAction<{src: {code: string, name: string}, dest: {code: string, name: string}}>>
};
const LangContext = createContext<LangContextType>({
  selectedLangs: {
    src: {code: "en", name: "English"}, 
    dest: {code: "fa", name: "Persian"}
  },
  setSelectedLangs: () => {}
});

type TransContextType = {
  translation: {input: string, output: string},
  setTranslation: React.Dispatch<React.SetStateAction<{input: string, output: string}>>
}
const TransContext = createContext<TransContextType>({
  translation: {input: "", output: ""},
  setTranslation: () => {}
});

function Main(): ReactElement {
  type LangStateType = {
    src: {code: string, name: string}, 
    dest: {code: string, name: string}
  }
  const [selectedLangs, setSelectedLangs] = useState<LangStateType>({
    src: {code: "en", name: "English"},
    dest: {code: "fa", name: "Persian"}
  });
  type TransStateType = {input: string, output: string};
  const [translation, setTranslation] = useState<TransStateType>({
    input: "",
    output: ""
  });
  const [netAlert, setNetAlert] = useState<string>("")
  const fetchTranslation = async () => {
    let langpair = selectedLangs.src.code + "|" + selectedLangs.dest.code;
    let url = `https://api.mymemory.translated.net/get?q=${translation.input}&langpair=${langpair}`;
    try {
      let response = await fetch(url);
      if(response.ok) {
        let data = await response.json();
        let translation = await data.responseData.translatedText;
        console.log(data.responseData.translatedText)
        setTranslation(prev => {
          return {...prev, output: decodeHTML(translation)}
        });
      } else {
        throw new Error(`Something went wrong: ${response.status}`);
      }
    } catch(error) {  
      console.log(error);
    }
  };

  const decodeHTML = (txt: string): string => {
    const dummyElem = document.createElement("textarea");
    dummyElem.innerHTML = txt;
    return dummyElem.value;
  }

  // a second alternative is using useDebounce hook in use-debounce package
  let timer = useRef<ReturnType<typeof setTimeout>>(); 
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if(translation.input.length > 0 && !netAlert) {
        fetchTranslation();
      } else {
        setTranslation(prev => {
          return {...prev, output: ""}
        });
      }
    }, 1000);
  }, [translation.input, selectedLangs.src.code, selectedLangs.dest.code]);
  useEffect(() => {
    window.addEventListener("offline", () => {
      setNetAlert("Check your Internet connection!");
    });
    window.addEventListener("online", () => {
      setNetAlert("");
    });
  }, []);
  return (
    <main className="m-auto mb-5 w-[93%] border border-neutral-300 shadow-2xl max-w-xl dark:bg-slate-900 dark:border-slate-700 dark:text-white">
      <LangContext.Provider value={{selectedLangs, setSelectedLangs}}>
      <TransContext.Provider value={{translation, setTranslation}}>
        <LangSection />
        <div className="relative w-full border-t border-neutral-300 dark:border-slate-700">
          <InputSection />
          <OutputSection />
        </div>
      </TransContext.Provider>
      </LangContext.Provider>
      <AlertBox>{netAlert}</AlertBox>
    </main>
  );
}

export {LangContext, TransContext};
export default Main;