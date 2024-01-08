import { ReactElement, useContext, useEffect, useState } from "react";
import { TransContext } from "./../../contexts/TransProvider";
import { LangContext } from "./../../contexts/LangProvider";
import RoundBTN from "../common/SquareBTN";
import AlertBox, { useAlertTimer } from "../common/AlertBox";
import ToSpeech from "./ToSpeech";
import { SaveContext } from "./../../contexts/SaveProvider";

function OutputSection(): ReactElement {
  const { translation } = useContext(TransContext);
  const { selectedLangs } = useContext(LangContext);
  const [copyMessage, setCopyMessage] = useState<string>("");
  const [isBookmarked, setBookmarked] = useState(false);
  const { bookmarks, toggleBookmark } = useContext(SaveContext);

  useEffect(() => {
    setBookmarked(() => {
      return bookmarks.some(
        (item) =>
          item.input === translation.input &&
          item.output === translation.output,
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarks, translation.output]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Translation copied!");
  };
  useAlertTimer(copyMessage, setCopyMessage);
  return (
    <section className="flex flex-col min-h-[200px] w-full max-w-xl border-t-4 border-dashed border-slate-600 bg-neutral-100 p-3 dark:border-slate-200 dark:bg-slate-800 dark:shadow-none">
      <div className="flex-grow flex justify-between">
        <div
          dir="auto"
          className="min-h-[120px] w-full resize-none break-words bg-transparent text-lg text-black outline-none dark:text-white "
        >
          {translation.output}
        </div>
      </div>
      <div className="relative top-1 flex w-full items-center justify-between">
        <div>
          {translation.output.length > 0 && (
            <>
              <RoundBTN
                iconName="Copy"
                description="Copy translation"
                handler={() => {
                  copyToClipboard(translation.output);
                }}
              />
              <ToSpeech role="dest" />
              {isBookmarked ? (
                <RoundBTN
                  iconName="Bookmarked"
                  description="Remove from bookmarks"
                  handler={() => {
                    toggleBookmark({
                      ...translation,
                      src: selectedLangs.src.name,
                      dest: selectedLangs.dest.name,
                    });
                    setBookmarked(false);
                  }}
                />
              ) : (
                <RoundBTN
                  iconName="Bookmark"
                  description="Add to bookmarks"
                  handler={() => {
                    toggleBookmark({
                      ...translation,
                      src: selectedLangs.src.name,
                      dest: selectedLangs.dest.name,
                    });
                    setBookmarked(true);
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
      <AlertBox text={copyMessage} />
    </section>
  );
}

export default OutputSection;
