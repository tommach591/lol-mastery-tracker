import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Mastery from "../Mastery";
import { useEffect, useState } from "react";
import { getChampions } from "../../utils/League";

function App() {
  const [champions, setChampions] = useState();

  useEffect(() => {
    getChampions().then((res) => {
      setChampions(Object.values(res.data));
    });
  }, []);

  return champions ? (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mastery/:region/:summonerName"
          element={<Mastery champions={champions} />}
        />
      </Routes>
    </div>
  ) : (
    <div />
  );
}

export default App;
