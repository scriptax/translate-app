import { ReactElement } from "react";
import DarkModeBTN from "./DarkModeBTN";
import appLogo from "../../assets/images/logo.png";
import Button from "../common/Button";

type headerProps = {
  darkModeHandler: () => void;
  showHistHandler: () => void;
  darkMode: boolean;
};
function Header({ darkModeHandler, showHistHandler, darkMode }: headerProps): ReactElement {
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
        <Button text="History" handler={showHistHandler} />
        <DarkModeBTN darkModeHandler={darkModeHandler} darkMode={darkMode} />
      </div>
    </header>
  );
}

export default Header;
