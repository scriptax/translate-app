import { ReactElement, useEffect, useState } from "react";
import icons from "../../misc/SVGs";

function Footer(): ReactElement {
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <footer className="relative -bottom-2 h-20 m-auto w-full max-w-xl px-4 dark:text-white sm:px-0">
      <div className="flex items-center justify-between">
        <span>© {date?.getFullYear()} By scriptax.</span>
        <a href="https://github.com/scriptax/translate-app" target="blank">
          {icons.Github}
        </a>
      </div>
      <div className="text-sm pt-1">
        Translation API by <a className="underline" href="https://mymemory.translated.net/">MyMemory</a><br />
        Speech synthesis API by <a className="underline" href="https://voicerss.org/">Voice RSS</a>
      </div>
    </footer>
  );
}

export default Footer;
