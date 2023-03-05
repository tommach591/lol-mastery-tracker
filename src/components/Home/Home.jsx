import "./Home.css";
import Searchbar from "../Searchbar";

function Home() {
  return (
    <div className="Home">
      <div className="Title">
        <h1>LoL Summoner Mastery Database</h1>
      </div>
      <Searchbar />
    </div>
  );
}

export default Home;
