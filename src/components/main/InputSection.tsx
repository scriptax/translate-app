import { ReactElement, useState, useRef, useEffect, useContext } from "react";
import RoundBTN from "./SquareBTN";
import readClipboard from "../../misc/readClipboard";
import { TransContext } from "./Main";
import ToSpeech from "./ToSpeech";
import AlertBox from "../common/AlertBox";

function InputSection(): ReactElement {
  const {translation, setTranslation} = useContext(TransContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null); // only for adjusting height
  const [message, setMessage] = useState<string>("");
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if(translation.input.length >= 500) {
      setMessage("Text limit reached!");
      return undefined;
    }
    setTranslation(prev => ({...prev, input: e.target.value}));
  }; 
  
  const pasteHandler = async (): Promise<void> => {
    let text: string = await readClipboard();
    if(translation.input.length + text.length >= 500) {
      setMessage("Text limit reached!");
      return undefined;
    }
    setTranslation(prev => ({...prev, input: prev.input + text}));
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if(message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    return () => {
      clearTimeout(timer)
    };
  }, [message]);

  const adjustHeight = (): void => {
    const textarea = textareaRef.current!;
    textarea.style.height = "120px";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  
  useEffect(() => {
    adjustHeight();
  }, [translation.input]);

  return(
    // we can also make the section flex and direction column to send the buttons to bottom
    <section className="p-3 -mb-1 min-h-[160px] w-full max-w-xl dark:shadow-none">
      <div className="flex justify-between">
        <div className="relative w-11/12 pt-2">
          <textarea 
            placeholder="Type here to translate" 
            dir="auto"
            className="w-full min-h-[120px] outline-none hover:cursor-text font-extralight text-xl bg-transparent dark:text-white text-black resize-none"
            onChange={changeHandler}
            value={translation.input}
            ref={textareaRef}
          ></textarea>
        </div>
        {translation.input.length > 0 && <RoundBTN iconName="Close" description="Clear" handler={() => {setTranslation({input: "", output: ""})}} />}
      </div>
      <div className="relative top-1 w-full flex justify-between items-center">
        <div>
          <RoundBTN iconName="Paste" description="Paste from clipboard" handler={() => {pasteHandler()}} />
          {translation.input.length > 0 && <ToSpeech role="src" />}
        </div>
        <div className="text-sm">
          {translation.input.length}/500
        </div>
      </div>
      <AlertBox>{message}</AlertBox>
    </section>
  );
}

export default InputSection;