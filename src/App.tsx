import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import TransProvider from "./contexts/TransProvider";
import LangProvider from "./contexts/LangProvider";

function App() {
  const [showHist, setShowHist] = useState<boolean>(false);
  const [showSaved, setShowSaved] = useState<boolean>(false);
  const showHistHandler = (): void => {
    setShowHist((prev) => !prev);
    setShowSaved(false);
  };
  const showSavedHandler = (): void => {
    setShowSaved((prev) => !prev);
    setShowHist(false);
  };
  useEffect(() => {
    document.body.style.overflowY = "scroll";
  }, []);
  return (
    <div className="flex flex-col min-h-screen relative w-full bg-gray-50 font-primary text-slate-800 dark:bg-gray-900">
      <Header
        showHistHandler={showHistHandler}
        showSavedHandler={showSavedHandler}
      />
      <LangProvider>
        <TransProvider>
          <Main
            showHist={showHist}
            showSaved={showSaved}
            showHistHandler={showHistHandler}
            showSavedHandler={showSavedHandler}
          />
        </TransProvider>
      </LangProvider>
      <Footer />
    </div>
  );
}

export default App;
