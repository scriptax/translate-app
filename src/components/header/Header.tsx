import { ReactElement } from "react";
import DarkModeBTN from "./DarkModeBTN";
import appLogo from "../../assets/images/logo.png";
import Button from "../common/Button";

type HeaderProps = {
  showHistHandler: () => void;
  showSavedHandler: () => void;
};

function Header({
  showHistHandler,
  showSavedHandler,
}: HeaderProps): ReactElement {
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
        <Button text="Saved" handler={showSavedHandler} icon="Bookmarked" />
        <Button text="History" handler={showHistHandler} icon="Hist" />
        <DarkModeBTN />
      </div>
    </header>
  );
}

export default Header;
