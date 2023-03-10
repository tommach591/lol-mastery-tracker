import "./Home.css";
import Searchbar from "../Searchbar";

function Home() {
  return (
    <div className="Home">
      <div className="Title">
        <h1>LoL Mastery Tracker</h1>
      </div>
      <Searchbar />
    </div>
  );
}

export default Home;
