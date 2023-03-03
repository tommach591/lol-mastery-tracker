import "./Mastery.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  useEffect(() => {
    getSummoner(region, summonerName).then((res) => {
      setSummonerInfo(res);
      getMastery(region, res.id).then((res) => {
        setSummonerMastery(res);

        console.log(champions);
        console.log(res);
      });
    });
  }, [region, summonerName, navigate]);

  const ChampionIcon = (championId) => {
    let championName = champions.find(
      (champ) => parseInt(champ.key) === parseInt(championId)
    ).id;

    return <img src={getChampionIcon(championName)} alt="" />;
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
      <div className="ChampionGrid">
        {summonerMastery.map((champion) => {
          return (
            <div className="ChampionPortrait" key={champion.championId}>
              {ChampionIcon(champion.championId)}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Mastery;
