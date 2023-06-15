import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";

function App() {
  const [showHist, setShowHist] = useState<boolean>(false);
  const showHistHandler = (): void => {
    setShowHist((prev) => !prev);
  };
  useEffect(() => {
    document.body.style.overflowY = "scroll";
  }, []);
  return (
    <div className="flex flex-col min-h-screen relative w-full bg-slate-50 font-primary text-slate-800 dark:bg-slate-900">
      <Header showHistHandler={showHistHandler} />
      <Main showHist={showHist} showHistHandler={showHistHandler} />
      <Footer />
    </div>
  );
}

export default App;
