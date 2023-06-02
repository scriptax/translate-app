import { ReactElement, useState } from "react";
import RoundBTN from "./RoundBTN";

const InputField = (): ReactElement => {
  const [text, setText] = useState<string>("");
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
    e.target.style.height = "120px";
    e.target.style.height = e.target.scrollHeight + "px";
  }; 

  return (
    <div className="relative w-5/6">
      <textarea 
      placeholder="Start typing here" 
      className="w-5/6 min-h-[120px] outline-none hover:cursor-text text-lg bg-transparent dark:text-white text-black resize-none"
      onChange={changeHandler}
      value={text}
      ></textarea>
    </div>
  );
};

function InputSection(): ReactElement {
  return(
    // we can also make the section flex and direction column to send the buttons to bottom
    <section className="p-3 -mb-1 min-h-[160px] w-full max-w-xl dark:shadow-none border-neutral-300 rounded-md">
      <div className="flex justify-between">
        <InputField />
        <RoundBTN iconName="Close" description="Clear" handler={() => {}} />
      </div>
      <div className="relative top-1 w-full flex justify-between items-center">
        <div>
          <RoundBTN iconName="Listen" description="Listen" handler={() => {}} />
          <RoundBTN iconName="Paste" description="Paste from clipboard" handler={() => {}} />
        </div>
        <div className="text-sm">
          1/2000
        </div>
      </div>
    </section>
  );
}

export default InputSection;