import { ReactElement, useEffect, useState } from "react";
import icons from "../../misc/SVGs";

function Footer(): ReactElement {
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setDate(new Date()); 
  }, []);
  return (
    <footer className="relative -bottom-2 h-20 w-full px-4 sm:px-0 max-w-xl m-auto flex items-center justify-between dark:text-white">
      <span>© {date?.getFullYear()} By scriptax.</span>
      <a href="https://github.com/scriptax/translate-app" target="blank">{icons.Github}</a>
    </footer>
  );
}

export default Footer;