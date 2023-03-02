import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
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
  const [summonerName, setSummonerName] = useState();
  const [region, setRegion] = useState(regions[0]);

  return (
    <div className="Home">
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
      />
      <button
        onClick={() => {
          navigate(`/mastery/${region}/${summonerName}`);
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Home;
