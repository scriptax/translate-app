import { ReactElement } from "react";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import BTNGroup from "./BTNGroup";

function Main(): ReactElement {
  return (
    <main className="m-auto w-full max-w-xl dark:bg-slate-900 dark:text-white px-4 sm:px-0">
      <BTNGroup />
      <div className="w-full border-solid border-neutral-300 dark:border-slate-700 dark:border-2 border rounded-lg">
        <InputSection />
        <OutputSection />
      </div>
    </main>
  );
}

export default Main;