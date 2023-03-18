import "./Home.css";
import Searchbar from "../Searchbar";

function Home() {
  return (
    <div className="Home">
      <div className="Title">
        <h1>LoL Mastery Tracker</h1>
      </div>
      <Searchbar />
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
