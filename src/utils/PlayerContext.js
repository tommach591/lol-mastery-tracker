import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getChampionRotations } from "./League";

const SummonerContext = createContext();
export function useSummoner() {
  return useContext(SummonerContext);
}

const SetSummonerContext = createContext();
export function useSetSummoner() {
  return useContext(SetSummonerContext);
}

const RegionContext = createContext();
export function useRegion() {
  return useContext(RegionContext);
}

const SetRegionContext = createContext();
export function useSetRegion() {
  return useContext(SetRegionContext);
}

const RotationsContext = createContext();
export function useRotations() {
  return useContext(RotationsContext);
}

export function PlayerProvider({ children }) {
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
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState(regions[0]);
  const [rotations, setRotations] = useState();

  const updateSummonerName = useCallback(
    (newSummonerName) => {
      if (summonerName !== newSummonerName) setSummonerName(newSummonerName);
    },
    [summonerName]
  );

  const updateRegion = useCallback(
    (newRegion) => {
      if (region !== newRegion) setRegion(newRegion);
    },
    [region]
  );

  useEffect(() => {
    getChampionRotations(region).then((res) => {
      res = JSON.parse(res);
      setRotations(res);
    });
  }, [region]);

  return (
    <SummonerContext.Provider value={summonerName}>
      <SetSummonerContext.Provider value={updateSummonerName}>
        <RegionContext.Provider value={region}>
          <SetRegionContext.Provider value={updateRegion}>
            <RotationsContext.Provider value={rotations}>
              {children}
            </RotationsContext.Provider>
          </SetRegionContext.Provider>
        </RegionContext.Provider>
      </SetSummonerContext.Provider>
    </SummonerContext.Provider>
  );
}
