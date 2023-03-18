import Iron from "../assets/iron.png";
import Bronze from "../assets/bronze.png";
import Silver from "../assets/silver.png";
import Gold from "../assets/gold.png";
import Platinum from "../assets/platinum.png";
import Diamond from "../assets/diamond.png";
import Master from "../assets/master.png";
import Grandmaster from "../assets/grandmaster.png";
import Challenger from "../assets/challenger.png";

const getAPIKey = () => process.env.REACT_APP_RIOT_API_KEY;
const version = "13.4.1";

export function getSummoner(region, summonerName) {
  return fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${getAPIKey()}`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getMastery(region, summonerID) {
  return fetch(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}?api_key=${getAPIKey()}`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getMasteryScore(region, summonerID) {
  return fetch(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${summonerID}?api_key=${getAPIKey()}`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getMasterYourself(region) {
  return fetch(
    `https://${region}.api.riotgames.com/lol/challenges/v1/challenges/401104/config?api_key=${getAPIKey()}`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getPlayerChallenges(region, puuid) {
  return fetch(
    `https://${region}.api.riotgames.com/lol/challenges/v1/player-data/${puuid}?api_key=${getAPIKey()}`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getProfileIcon(profileIconId) {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`;
}

export function getChampions() {
  return fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getChampionIcon(champion) {
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
