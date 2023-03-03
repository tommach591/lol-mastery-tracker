const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

export function getSummoner(region, summonerName) {
  return fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getMastery(region, summonerID) {
  return fetch(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}?api_key=${API_KEY}`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getProfileIcon(profileIconId) {
  return `http://ddragon.leagueoflegends.com/cdn/13.4.1/img/profileicon/${profileIconId}.png`;
}

export function getChampions() {
  return fetch(
    `http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion.json`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getChampionIcon(champion) {
  return `http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${champion}.png`;
}
