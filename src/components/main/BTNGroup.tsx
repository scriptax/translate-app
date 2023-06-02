import { ReactElement } from "react";
import ChooseLangBTN from "./ChooseLangBTN";
import RoundBTN from "./RoundBTN";

function BTNGroup(): ReactElement {
  return (
    <div className="mb-3 flex justify-between w-full">
      <ChooseLangBTN />
      <RoundBTN iconName="Swap" description="Change direction" handler={() => {}} />
      <ChooseLangBTN />
    </div>
  );
}

export default BTNGroup;