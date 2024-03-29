import { ReactElement, useState, useRef, useEffect, useContext } from "react";
import { TransContext } from "./../../contexts/TransProvider";
import SquareBTN from "../common/SquareBTN";
import readClipboard from "../../misc/readClipboard";
import ToSpeech from "./ToSpeech";
import AlertBox, { useAlertTimer } from "../common/AlertBox";
import loadingGif from "../../assets/images/loading.gif";

type TextAreaProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};
const TextArea = ({ setMessage }: TextAreaProps): ReactElement => {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // only for adjusting height
  const { translation, setTranslation } = useContext(TransContext);

  const changeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void | undefined => {
    setTranslation((prev) => ({ ...prev, input: e.target.value }));
    if (textareaRef.current!.value.length >= 500) {
      setTranslation((prev) => ({
        ...prev,
        input: prev.input.slice(0, 500),
      }));
      setMessage("Text limit reached!");
    }
  };
  const adjustHeight = (): void => {
    const textarea = textareaRef.current!;
    textarea.style.height = "120px";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  useEffect(() => {
    adjustHeight();
  }, [translation.input]);

  return (
    <textarea
      placeholder="Type here to translate"
      dir="auto"
      className="min-h-[120px] w-full resize-none bg-transparent text-lg font-light text-black outline-none hover:cursor-text dark:text-white"
      onChange={changeHandler}
      value={translation.input}
      ref={textareaRef}
    ></textarea>
  );
};

type PropsType = {
  loading: boolean;
};
function InputSection({ loading }: PropsType): ReactElement {
  const { translation, setTranslation } = useContext(TransContext);
  const [message, setMessage] = useState<string>("");

  const pasteHandler = async (): Promise<void> => {
    let text: string = await readClipboard();
    setTranslation((prev) => ({ ...prev, input: prev.input + text }));
    if (translation.input.length + text.length >= 500) {
      setTranslation((prev) => ({
        ...prev,
        input: prev.input.slice(0, 500),
      }));
      setMessage("Text limit reached!");
    }
  };

  useAlertTimer(message, setMessage);

  return (
    // we can also make the section flex and direction column to send the buttons to bottom
    <section className="-mb-1 min-h-[180px] w-full max-w-xl p-3 dark:shadow-none">
      <div className="flex justify-between">
        <div className="relative w-11/12 pt-2">
          <TextArea setMessage={setMessage} />
        </div>
        {translation.input.length > 0 && (
          <SquareBTN
            iconName="Close"
            description="Clear"
            handler={() => {
              setTranslation({ input: "", output: "" });
            }}
          />
        )}
      </div>
      <div className="relative top-1 flex w-full items-center justify-between">
        <div>
          <SquareBTN
            iconName="Paste"
            description="Paste from clipboard"
            handler={() => {
              pasteHandler();
            }}
          />
          {translation.input.length > 0 && <ToSpeech role="src" />}
          {loading && (
            <img
              className="inline-block pb-2 dark:invert"
              width="20px"
              height="7px"
              src={loadingGif}
              alt="loading"
            />
          )}
        </div>
        <div className="text-sm">{translation.input.length}/500</div>
      </div>
      <AlertBox text={message} />
    </section>
  );
}

export default InputSection;
