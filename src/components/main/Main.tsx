import {
  ReactElement,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import LangSection from "./LangSection";
import AlertBox from "../common/AlertBox";
import History from "./History";

type LangStateType = {
  src: { code: string; name: string };
  dest: { code: string; name: string };
}
type TransStateType = { input: string; output: string };

interface LangContextType<T> {
  selectedLangs: T;
  setSelectedLangs: React.Dispatch<
    React.SetStateAction<{
      src: { code: string; name: string };
      dest: { code: string; name: string };
    }>
  >;
};
interface TransContextType<T> {
  translation: T;
  setTranslation: React.Dispatch<
    React.SetStateAction<{ input: string; output: string }>
  >;
};

const LangContext = createContext<LangContextType<LangStateType>>({
  selectedLangs: {
    src: { code: "en", name: "English" },
    dest: { code: "fa", name: "Persian" },
  },
  setSelectedLangs: () => {},
});
const TransContext = createContext<TransContextType<TransStateType>>({
  translation: { input: "", output: "" },
  setTranslation: () => {},
});

type PropsType = {
  showHist: boolean;
  showHistHandler: () => void;
}
function Main({showHist, showHistHandler}: PropsType): ReactElement {
  const [selectedLangs, setSelectedLangs] = useState<LangStateType>({
    src: { code: "en", name: "English" },
    dest: { code: "fa", name: "Persian" },
  });
  const [translation, setTranslation] = useState<TransStateType>({
    input: "",
    output: "",
  });
  const [netAlert, setNetAlert] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchTranslation = async () => {
    let langpair = selectedLangs.src.code + "|" + selectedLangs.dest.code;
    let text = encodeURIComponent(translation.input);
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${langpair}`;
    try {
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        let translation = await data.responseData.translatedText;
        setTranslation((prev) => {
          return { ...prev, output: decodeHTML(translation) };
        });
        setLoading(false);
      } else {
        throw new Error(`Something went wrong: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
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
  }, [translation.input, selectedLangs.src.code, selectedLangs.dest.code]);

  useEffect(() => {
    if(!localStorage.getItem("translateAppHist")) {
      localStorage.setItem("translateAppHist", JSON.stringify([]));
    }
    if(translation.input.length > 0) {
      const histData = JSON.parse(localStorage.getItem("translateAppHist") as string);
      histData.push({
        src: selectedLangs.src.name, 
        dest: selectedLangs.dest.name, 
        input: translation.input, 
        output: translation.output
      });
      localStorage.setItem("translateAppHist", JSON.stringify(histData));
    }
  }, [translation.output]);
  
  useEffect(() => {
    window.addEventListener("offline", () => {
      setNetAlert("Check your Internet connection!");
    });
    window.addEventListener("online", () => {
      setNetAlert("");
    });
  }, []);
  return (
    <main className="flex-grow mx-auto w-[93%] max-w-xl">
      <section className="relative w-full border border-neutral-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-white">
        <LangContext.Provider value={{ selectedLangs, setSelectedLangs }}>
          <TransContext.Provider value={{ translation, setTranslation }}>
            <History showHist={showHist} showHistHandler={showHistHandler} />
            <LangSection />
            <div className="relative w-full border-t border-neutral-300 dark:border-slate-700">
              <InputSection loading={loading} />
              <OutputSection />
            </div>
          </TransContext.Provider>
        </LangContext.Provider>
        <AlertBox text={netAlert} />
      </section>
    </main>
  );
}

export { LangContext, TransContext };
export default Main;
