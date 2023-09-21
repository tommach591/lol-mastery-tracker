import "./Searchbar.css";
import { useNavigate } from "react-router-dom";
import { getSummoner } from "../../utils/League";
import {
  useRegion,
  useSetRegion,
  useSetSummoner,
  useSummoner,
} from "../../utils/PlayerContext";
import { useCallback } from "react";

function Searchbar() {
  const regions = [
    "na1",
    "br1",
    "eun1",
    "euw1",
    "jp1",
    "kr",
    "la1",
    "la2",
    "oc1",
    "ph2",
    "ru",
    "sg2",
    "th2",
    "tr1",
    "tw2",
    "vn2",
  ];

  const navigate = useNavigate();
  const summonerName = useSummoner();
  const setSummonerName = useSetSummoner();
  const region = useRegion();
  const setRegion = useSetRegion();

  const handleSubmit = useCallback(() => {
    getSummoner(region, summonerName).then((res) => {
      const msg = JSON.parse(res);
      if (!msg.status) {
        navigate(`/mastery/${region}/${summonerName}`);
        setSummonerName("");
      } else {
        alert("Summoner not found!");
      }
    });
  }, [region, summonerName, setSummonerName, navigate]);

  return (
    <div className="Searchbar">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <select
          onChange={(event) => {
            setRegion(event.currentTarget.value);
          }}
        >
          {regions.map((reg) => {
            return (
              <option key={reg} value={reg}>
                {reg.toUpperCase()}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          onChange={(event) => {
            setSummonerName(event.currentTarget.value);
          }}
          placeholder="Summoner name..."
          value={summonerName}
        />
        <button type="search">
          <img
            src="https://api.iconify.design/ph:magnifying-glass-bold.svg?color=%23323232"
            alt=""
          />
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
