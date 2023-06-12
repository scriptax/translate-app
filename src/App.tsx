import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";

function App() {
  console.log("rendered");
  const [darkMode, setDarkMode] = useState<boolean>(false); // maybe we can move the whole dark mode thing to DarkModeBTN
  const darkModeHandler = (): void => {
    setDarkMode((prev) => !prev);
  };
  useEffect(() => {
    document.body.parentElement?.classList[darkMode ? "add" : "remove"]("dark");
  }, [darkMode]);
  useEffect(() => {
    document.body.style.overflowY = "scroll";
  }, []);
  return (
    <div className="min-h-screen w-full bg-slate-50 font-primary text-slate-800 dark:bg-slate-900">
      <Header darkModeHandler={darkModeHandler} darkMode={darkMode} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
