import "./ChampionPortrait.css";
import Chest from "../../assets/chest.png";
import { getChampionIcon } from "../../utils/League";
import { useState } from "react";
import MasteryPopup from "../MasteryPopup/MasteryPopup";

function ChampionPortrait({ version, championInfo, championMastery }) {
  const [popupOn, setPopupOn] = useState(false);

  const ChampionIcon = (championId) => {
    return (
      <img
        className="ChampionIcon"
        src={getChampionIcon(version, championId)}
        alt=""
        onMouseEnter={() => {
          setPopupOn(true);
        }}
        onMouseLeave={() => {
          setPopupOn(false);
        }}
      />
    );
  };

  return championMastery ? (
    <div className="ChampionPortrait">
      <MasteryPopup champion={championMastery} popupOn={popupOn} />
      {ChampionIcon(championInfo.id)}
      {championMastery.chestGranted ? (
        <img className="Chest" src={Chest} alt="" />
      ) : (
        <div />
      )}
      <h1>{championInfo.name}</h1>
    </div>
  ) : (
    <div className="ChampionPortrait">
      {ChampionIcon(championInfo.id)}
      <h1>{championInfo.name}</h1>
    </div>
  );
}

export default ChampionPortrait;
