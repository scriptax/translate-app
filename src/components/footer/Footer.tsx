import { ReactElement, useEffect, useState } from "react";
import icons from "../../misc/SVGs";

function Footer(): ReactElement {
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <footer className="relative -bottom-2 m-auto flex h-20 w-full max-w-xl items-center justify-between px-4 dark:text-white sm:px-0">
      <span>© {date?.getFullYear()} By scriptax.</span>
      <a href="https://github.com/scriptax/translate-app" target="blank">
        {icons.Github}
      </a>
    </footer>
  );
}

export default Footer;
