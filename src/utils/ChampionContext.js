import { useContext, createContext, useState, useEffect } from "react";
import { getChampions, getVersion } from "./League";

const ChampionContext = createContext();
export function useChampion() {
  return useContext(ChampionContext);
}

const VersionContext = createContext();
export function useVersion() {
  return useContext(VersionContext);
}

export function ChampionProvider({ children }) {
  const [champions, setChampions] = useState();
  const [version, setVersion] = useState();

  useEffect(() => {
    getVersion().then((res) => {
      setVersion(res[0]);
      getChampions(res[0]).then((res) => {
        setChampions(Object.values(res.data));
      });
    });
  }, []);

  return (
    <ChampionContext.Provider value={champions}>
      <VersionContext.Provider value={version}>
        {children}
      </VersionContext.Provider>
    </ChampionContext.Provider>
  );
}
