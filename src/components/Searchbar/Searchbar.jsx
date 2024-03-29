import "./Searchbar.css";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../../utils/League";
import {
  useRegion,
  useSetRegion,
  useSetSummoner,
  useSetTag,
  useSummoner,
  useTag,
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
  const username = useSummoner();
  const setUsername = useSetSummoner();
  const tag = useTag();
  const setTag = useSetTag();
  const region = useRegion();
  const setRegion = useSetRegion();

  const handleSubmit = useCallback(() => {
    getAccount(region, username, tag).then((res) => {
      const msg = JSON.parse(res);
      if (!msg.status) {
        navigate(`/mastery/${region}/${username}/${tag}`);
        setUsername("");
        setTag("");
      } else {
        alert("User not found!");
      }
    });
  }, [region, username, setUsername, tag, setTag, navigate]);

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
          className="username"
          type="text"
          onChange={(event) => {
            setUsername(event.currentTarget.value);
          }}
          placeholder="Username"
          value={username}
        />
        <input
          className="tag"
          type="text"
          onChange={(event) => {
            setTag(event.currentTarget.value);
          }}
          placeholder="Tag"
          value={tag}
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
