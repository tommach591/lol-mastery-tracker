import "./Mastery.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chest from "../../assets/chest.png";
import {
  getMastery,
  getProfileIcon,
  getSummoner,
  getChampionIcon,
} from "../../utils/League";
import Searchbar from "../Searchbar";

function Mastery({ champions }) {
  const { region, summonerName } = useParams();
  const [summonerInfo, setSummonerInfo] = useState();
  const [summonerMastery, setSummonerMastery] = useState();
  const navigate = useNavigate();

  const convertToID = ["Nunu"];

  useEffect(() => {
    getSummoner(region, summonerName).then((res) => {
      if (!res) navigate("/");
      setSummonerInfo(res);
      getMastery(region, res.id).then((res) => {
        setSummonerMastery(res);
      });
    });
  }, [region, summonerName, navigate]);

  const ChampionIcon = (championId) => {
    return (
      <img className="ChampionIcon" src={getChampionIcon(championId)} alt="" />
    );
  };

  const MasteryGrid = () => {
    const championsByMasteryLevel = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
    };

    for (const c of champions) {
      let champion = summonerMastery.find(
        (champ) => parseInt(champ.championId) === parseInt(c.key)
      );

      if (champion) {
        championsByMasteryLevel[champion.championLevel].push(
          <div className="ChampionPortrait" key={c.id}>
            {ChampionIcon(c.id)}
            {champion.chestGranted ? (
              <img className="Chest" src={Chest} alt="" />
            ) : (
              <div />
            )}
            <h1>{convertToID.includes(c.id) ? c.id : c.name}</h1>
          </div>
        );
      } else {
        championsByMasteryLevel[0].push(
          <div className="ChampionPortrait" key={c.id}>
            {ChampionIcon(c.id)}
            <h1>{convertToID.includes(c.id) ? c.id : c.name}</h1>
          </div>
        );
      }
    }

    const ChampionGrids = [];

    for (let i = 7; i >= 0; i--) {
      if (championsByMasteryLevel[i].length > 0) {
        ChampionGrids.push(
          <div className="MasteryLevel" key={i}>
            <h1>{i > 0 ? `Mastery Level ${i}` : "Unranked"}</h1>
            <div className="ChampionGrid">{championsByMasteryLevel[i]}</div>
          </div>
        );
      }
    }

    return ChampionGrids;
  };

  return summonerMastery ? (
    <div className="Mastery">
      <div className="Header">
        <Searchbar />
      </div>
      <div className="Profile">
        <img
          className="SummonerIcon"
          src={getProfileIcon(summonerInfo.profileIconId)}
          alt=""
        />
        <h1 className="SummonerName">{summonerInfo.name}</h1>
      </div>
      {MasteryGrid()}
    </div>
  ) : (
    <div />
  );
}

export default Mastery;
