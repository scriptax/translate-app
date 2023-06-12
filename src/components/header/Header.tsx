import { ReactElement } from "react";
import DarkModeBTN from "./DarkModeBTN";
import appLogo from "../../assets/images/logo.png";

const HistoryBTN = (): ReactElement => {
  return (
    <button className=" relative h-10 w-24 border border-solid border-green-300 bg-green-50 pt-1 text-lg font-light outline-none hover:bg-green-300 dark:bg-transparent dark:text-green-300 dark:hover:bg-green-300 dark:hover:text-slate-900">
      History
    </button>
  );
};

type headerProps = {
  darkModeHandler: () => void;
  darkMode: boolean;
};
function Header({ darkModeHandler, darkMode }: headerProps): ReactElement {
  return (
    <header className="m-auto flex h-20 w-full max-w-xl items-center justify-between px-4 text-black sm:px-0">
      <div className="dark:text-white">
        <img
          width="45px"
          height="45px"
          src={appLogo}
          className="dark:invert"
          alt="App Logo"
          draggable="false"
        />
      </div>
      <div className="flex items-center justify-center">
        <HistoryBTN />
        <DarkModeBTN darkModeHandler={darkModeHandler} darkMode={darkMode} />
      </div>
    </header>
  );
}

export default Header;
