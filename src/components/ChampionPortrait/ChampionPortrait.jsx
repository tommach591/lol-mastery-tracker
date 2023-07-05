import "./ChampionPortrait.css";
import Chest from "../../assets/chest.png";
import { getChampionIcon } from "../../utils/League";
import { useState } from "react";
import MasteryPopup from "../MasteryPopup/MasteryPopup";

function ChampionPortrait({ version, championInfo, championMastery, isFree }) {
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
      {isFree ? (
        <img
          className="F2P"
          src="https://api.iconify.design/material-symbols:lock-open.svg?color=%23f5b90f"
          alt=""
        />
      ) : (
        <div />
      )}
      <h1>{championInfo.name}</h1>
    </div>
  ) : (
    <div className="ChampionPortrait">
      {ChampionIcon(championInfo.id)}
      {isFree ? <h1 className="F2P">F2P</h1> : <div />}
      <h1>{championInfo.name}</h1>
    </div>
  );
}

export default ChampionPortrait;
