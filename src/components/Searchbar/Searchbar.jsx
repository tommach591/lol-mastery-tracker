import "./Searchbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSummoner } from "../../utils/League";

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
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState(regions[0]);

  return (
    <div className="Searchbar">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          getSummoner(region, summonerName).then((res) => {
            if (res) {
              navigate(`/mastery/${region}/${summonerName}`);
              setSummonerName("");
            } else {
              alert("Summoner not found!");
            }
          });
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Searchbar;
