import "./Home.css";
import Searchbar from "../Searchbar";
import { useRotations } from "../../utils/PlayerContext";
import { useChampion, useVersion } from "../../utils/ChampionContext";
import ChampionPortrait from "../ChampionPortrait";

function Home() {
  const champions = useChampion();
  const version = useVersion();
  const rotations = useRotations();

  const ChampionRotations = () => {
    const championRotations = [];

    for (const c of champions) {
      const isFree = rotations.freeChampionIds.includes(parseInt(c.key));
      if (isFree) {
        championRotations.push(
          <ChampionPortrait
            key={c.id}
            version={version}
            championInfo={c}
            isFree={isFree}
          />
        );
      }
    }

    return <div className="ChampionGrid">{championRotations}</div>;
  };

  return (
    <div className="Home">
      <div className="Title">
        <h1>LoL Mastery Tracker</h1>
      </div>
      <Searchbar />
      <div className="FreeChampRotations">
        <h1>Free Champion Rotations</h1>
        {rotations ? ChampionRotations() : <div />}
      </div>

      <h2 className="Footer">
        LoL Mastery Tracker is not endorsed by Riot Games and does not reflect
        the views or opinions of Riot Games or anyone officially involved in
        producing or managing Riot Games properties. Riot Games and all
        associated properties are trademarks or registered trademarks of Riot
        Games, Inc.
      </h2>
    </div>
  );
}

export default Home;
