import { ReactElement, useState, useRef, useEffect } from "react";
import RoundBTN from "./RoundBTN";
import readClipboard from "../common/readClipboard";

function InputSection(): ReactElement {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null); // only for adjusting height
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  }; 
  
  const pasteHandler = async (): Promise<void> => {
    let text: string = await readClipboard();
    setText(prevText => prevText + text);
  };

  const adjustHeight = (): void => {
    const textarea = textareaRef.current!;
    textarea.style.height = "120px";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  
  useEffect(() => {
    adjustHeight();
  }, [text]);
  return(
    // we can also make the section flex and direction column to send the buttons to bottom
    <section className="p-3 -mb-1 min-h-[160px] w-full max-w-xl dark:shadow-none border-neutral-300 rounded-md">
      <div className="flex justify-between">
        <div className="relative w-5/6">
          <textarea 
          placeholder="Start typing here" 
          className="w-5/6 min-h-[120px] outline-none hover:cursor-text text-lg bg-transparent dark:text-white text-black resize-none"
          onChange={changeHandler}
          value={text}
          ref={textareaRef}
          ></textarea>
        </div>
        <RoundBTN iconName="Close" description="Clear" handler={() => {setText("")}} />
      </div>
      <div className="relative top-1 w-full flex justify-between items-center">
        <div>
          <RoundBTN iconName="Listen" description="Listen" handler={() => {}} />
          <RoundBTN iconName="Paste" description="Paste from clipboard" handler={() => {pasteHandler()}} />
        </div>
        <div className="text-sm">
          1/2000
        </div>
      </div>
    </section>
  );
}

export default InputSection;