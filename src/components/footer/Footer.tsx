import { ReactElement, useEffect, useState } from "react";
import icons from "../../misc/SVGs";

function Footer(): ReactElement {
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <footer className="m-auto w-full max-w-xl px-4 py-4 dark:text-white sm:px-0">
      <div className="flex items-center justify-between text-sm">
        <span>© {date?.getFullYear()} By Majid Moradi.</span>
        <a href="https://github.com/scriptax/translate-app" target="blank">
          {icons.Github}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
