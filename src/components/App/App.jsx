import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Mastery from "../Mastery";
import { useChampion } from "../../utils/ChampionContext";
import { usePing } from "../../utils/usePing";

function App() {
  const ping = usePing();
  const champions = useChampion();

  return ping && champions ? (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mastery/:region/:summonerName" element={<Mastery />} />
      </Routes>
    </div>
  ) : (
    <div />
  );
}

export default App;

