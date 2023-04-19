import Iron from "../assets/iron.png";
import Bronze from "../assets/bronze.png";
import Silver from "../assets/silver.png";
import Gold from "../assets/gold.png";
import Platinum from "../assets/platinum.png";
import Diamond from "../assets/diamond.png";
import Master from "../assets/master.png";
import Grandmaster from "../assets/grandmaster.png";
import Challenger from "../assets/challenger.png";

const SERVER_URL = "https://lol-mastery-tracker.herokuapp.com/";

export function getSummoner(region, summonerName) {
  return fetch(`${SERVER_URL}api/League/summoner/${region}/${summonerName}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getMastery(region, summonerID) {
  return fetch(`${SERVER_URL}api/League/mastery/${region}/${summonerID}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getMasteryScore(region, summonerID) {
  return fetch(`${SERVER_URL}api/League/score/${region}/${summonerID}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getMasterYourself(region) {
  return fetch(`${SERVER_URL}api/League/mission/${region}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getPlayerChallenges(region, puuid) {
  return fetch(`${SERVER_URL}api/League/challenges/${region}/${puuid}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getVersion() {
  return fetch(`https://ddragon.leagueoflegends.com/api/versions.json`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getProfileIcon(version, profileIconId) {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`;
}

export function getChampions(version) {
  return fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getChampionIcon(version, champion) {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}.png`;
}

export function getTier(level) {
  switch (level) {
    case "IRON":
      return Iron;
    case "BRONZE":
      return Bronze;
    case "SILVER":
      return Silver;
    case "GOLD":
      return Gold;
    case "PLATINUM":
      return Platinum;
    case "DIAMOND":
      return Diamond;
    case "MASTER":
      return Master;
    case "GRANDMASTER":
      return Grandmaster;
    case "CHALLENGER":
      return Challenger;
    default:
      return Iron;
  }
}
