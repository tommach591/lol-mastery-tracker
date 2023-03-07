import "./Mastery.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chest from "../../assets/chest.png";
import Logo from "../../assets/logo.png";
import {
  getMastery,
  getProfileIcon,
  getSummoner,
  getChampionIcon,
  getMasteryScore,
  getPlayerChallenges,
  getMasterYourself,
  getTier,
} from "../../utils/League";
import Searchbar from "../Searchbar";

function Mastery({ champions }) {
  const { region, summonerName } = useParams();
  const [summonerInfo, setSummonerInfo] = useState();
  const [summonerMastery, setSummonerMastery] = useState();
  const [summonerChallenge, setSummonerChallenge] = useState();
  const [masterYourself, setMasterYourself] = useState();
  const [masteryScore, setMasteryScore] = useState(0);
  const navigate = useNavigate();

  const convertToID = ["Nunu"];
  const challengeID = 401104;

  const nextTier = {
    IRON: "BRONZE",
    BRONZE: "SILVER",
    SILVER: "GOLD",
    GOLD: "PLATINUM",
    PLATINUM: "DIAMOND",
    DIAMOND: "MASTER",
    MASTER: "GRANDMASTER",
    GRANDMASTER: "CHALLENGER",
    CHALLENGER: "CHALLENGER",
  };

  useEffect(() => {
    getSummoner(region, summonerName).then((res) => {
      if (!res) navigate("/");
      setSummonerInfo(res);
      getMasteryScore(region, res.id).then((res) => {
        setMasteryScore(res);
      });
      getMastery(region, res.id).then((res) => {
        setSummonerMastery(res);
      });
      getMasterYourself(region).then((res) => {
        console.log(res);
        setMasterYourself(res);
      });
      getPlayerChallenges(region, res.puuid).then((res) => {
        console.log(
          res.challenges.find((obj) => obj.challengeId === challengeID)
        );
        setSummonerChallenge(
          res.challenges.find((obj) => obj.challengeId === challengeID)
        );
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
        <img
          className="Logo"
          onClick={() => {
            navigate("/");
          }}
          src={Logo}
          alt=""
        />
        <Searchbar />
      </div>
      <div className="Profile">
        <div className="SummonerProgress">
          <div className="SummonerIconContainer">
            <img
              className="SummonerIcon"
              src={getProfileIcon(summonerInfo.profileIconId)}
              alt=""
            />
            <h1 className="SummonerLevel">{summonerInfo.summonerLevel}</h1>
          </div>
          <div className="SummonerInfo">
            <h1 className="SummonerName">{summonerInfo.name}</h1>
            <h1 className="MasteryScore">
              Total Mastery Score: {masteryScore}
            </h1>
          </div>
        </div>
        {masterYourself && summonerChallenge ? (
          <div className="SummonerChallenge">
            <div className="ChallengeInfo">
              <h1 className="ChallengeName">
                {masterYourself.localizedNames.en_US.name}
              </h1>
              <h1 className="ChallengeDescription">
                {masterYourself.localizedNames.en_US.description}
              </h1>
              <div className="ProgressBar">
                <h1>
                  {summonerChallenge.value}/
                  {masterYourself.thresholds[nextTier[summonerChallenge.level]]}
                </h1>
                <div
                  className="Progress"
                  style={{
                    width: `${
                      (summonerChallenge.value /
                        masterYourself.thresholds[
                          nextTier[summonerChallenge.level]
                        ]) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <img
              className="ChallengeTier"
              src={getTier(summonerChallenge.level)}
              alt=""
            />
          </div>
        ) : (
          <div />
        )}
      </div>
      {MasteryGrid()}
    </div>
  ) : (
    <div />
  );
}

export default Mastery;
