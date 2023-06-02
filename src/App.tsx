import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  console.log("rendered");
  const [darkMode, setDarkMode] = useState<boolean>(false); // maybe we can move the whole dark mode thing to DarkModeBTN
  const darkModeHandler = (): void => {
    setDarkMode((prev) => !prev);
  };
  useEffect(() => {
    console.log('run')
    document.body.parentElement?.classList[darkMode ? "add" : "remove"]("dark");
  }, [darkMode]);
  return (
    <div className="min-h-screen w-full font-primary bg-white dark:bg-slate-900">
      <Header darkModeHandler={darkModeHandler} darkMode={darkMode}/>
      <Main />
    </div>
  );
}

export default App;
