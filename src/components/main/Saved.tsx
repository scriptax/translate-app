import { ReactElement, useState, useContext } from "react";
import SquareBTN from "../common/SquareBTN";
import icons from "../../misc/SVGs";
import { SaveContext } from "../../contexts/SaveProvider";

type SavedItemsType = {
  src: string;
  dest: string;
  input: string;
  output: string;
};

type SavedItemPropsType = {
  item: SavedItemsType;
};
const SavedItem = ({ item }: SavedItemPropsType): ReactElement => {
  const [showTrash, setShowTrash] = useState(false);
  const { toggleBookmark } = useContext(SaveContext);

  return (
    <li
      className="w-full p-2 border-b dark:border-b-slate-500 break-words text-sm"
      onMouseOver={() => {
        setShowTrash(true);
      }}
      onMouseOut={() => {
        setShowTrash(false);
      }}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center mb-4 py-1">
          {item.src} {icons.Right} {item.dest}
        </div>
        {showTrash && (
          <SquareBTN
            iconName="Trash"
            handler={() => {
              toggleBookmark(item);
            }}
          />
        )}
      </div>
      <div>
        <p>{item.input}</p>
        <p dir="auto">{item.output}</p>
      </div>
    </li>
  );
};

const SavedList = (): ReactElement => {
  const { bookmarks } = useContext(SaveContext);
  return (
    <ul>
      {bookmarks.length ? (
        [...bookmarks]
          .reverse()
          .map(
            (item, index): ReactElement => (
              <SavedItem item={item} key={index} />
            ),
          )
      ) : (
        <EmptyMessage />
      )}
    </ul>
  );
};

const EmptyMessage = (): ReactElement => {
  return (
    <div className="text-neutral-500 dark:text-slate-400 w-2/3 text-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="mx-auto my-4 w-14">{icons.BookmarkSym}</div>
      <p>No bookmarks here!</p>
      <p>
        Save your favorite translations here by tapping the bookmark button.
        {icons.Bookmark}
      </p>
    </div>
  );
};

type PropsType = {
  showSaved: boolean;
  showSavedHandler: () => void;
};
export default function Saved({
  showSaved,
  showSavedHandler,
}: PropsType): ReactElement {
  return (
    <>
      {showSaved && (
        <section className="absolute left-[-2px] top-[-2px] z-20 h-[73vh] w-[100.8%] border border-solid border-neutral-300 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900 overflow-y-scroll scrollbar">
          <div className="flex h-10 mb-4 items-center justify-between rounded-md px-3">
            <strong>Saved Translations</strong>
            <SquareBTN
              iconName="Close"
              description="Close"
              handler={showSavedHandler}
            />
          </div>
          <hr className="dark:border-slate-500" />
          <SavedList />
        </section>
      )}
    </>
  );
}
