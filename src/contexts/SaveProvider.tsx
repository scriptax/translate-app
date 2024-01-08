import { ReactNode, createContext, useEffect, useState } from "react";

type BookmarkItemType = {
  input: string;
  output: string;
  src: string;
  dest: string;
};

interface SaveContextType<T> {
  bookmarks: T[];
  toggleBookmark: (translation: BookmarkItemType) => void;
}

export const SaveContext = createContext<SaveContextType<BookmarkItemType>>({
  bookmarks: [{ input: "", output: "", src: "", dest: "" }],
  toggleBookmark: () => {},
});

export default function SaveProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(
      localStorage.getItem("translateAppSaved") || "[]",
    ) as BookmarkItemType[];
  });

  useEffect(() => {
    localStorage.setItem("translateAppSaved", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (translation: BookmarkItemType) => {
    const isBookmarked = bookmarks.some(
      (item) =>
        translation.input === item.input && translation.output === item.output,
    );
    if (isBookmarked) {
      setBookmarks((prev) =>
        prev.filter(
          (item) =>
            !(
              item.input === translation.input &&
              item.output === translation.output
            ),
        ),
      );
    } else {
      setBookmarks([...bookmarks, translation]);
    }
  };

  return (
    <SaveContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </SaveContext.Provider>
  );
}
