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
