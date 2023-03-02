import "./Mastery.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMastery, getSummoner } from "../../utils/League";

function Mastery() {
  const { region, summonerName } = useParams();
  const [summonerInfo, setSummonerInfo] = useState();
  const [summonerMastery, setSummonerMastery] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getSummoner(region, summonerName).then((res) => {
      if (res) {
        setSummonerInfo(res);
        getMastery(region, res.id).then((res) => {
          setSummonerMastery(res);
        });
      } else {
        navigate(`/`);
      }
    });
  }, [region, summonerName, navigate]);

  return summonerMastery ? (
    <div className="Mastery">
      <div className="Profile">
        <img
          className="SummonerIcon"
          src={`http://ddragon.leagueoflegends.com/cdn/13.4.1/img/profileicon/${summonerInfo.profileIconId}.png`}
          alt=""
        />
        <h1 className="SummonerName">{summonerInfo.name}</h1>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default Mastery;
