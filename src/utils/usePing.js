import { useState, useEffect } from "react";

function pingServer() {
  const serverURL = "https://lol-mastery-tracker.herokuapp.com/";

  return fetch(`${serverURL}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function usePing() {
  const [ping, setPing] = useState(false);
  const [pingCount, setPingCount] = useState(0);

  useEffect(() => {
    pingServer().then((res) => {
      if (res) setPing(true);
      else {
        setPing(false);
        const timer = setTimeout(() => {
          if (pingCount < 10) {
            setPingCount(pingCount + 1);
          }
        }, 3000);
        return () => clearTimeout(timer);
      }
    });
  }, [pingCount]);

  return ping;
}
