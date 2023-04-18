import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Mastery from "../Mastery";
import { useChampion } from "../../utils/ChampionContext";
function App() {
  const champions = useChampion();

  return champions ? (
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

