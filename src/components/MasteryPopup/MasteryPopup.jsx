import { useEffect, useState } from "react";
import "./MasteryPopup.css";
import MasteryIconDefault from "../../assets/mastery_icon_default.png";
import MasteryIcon4 from "../../assets/mastery_icon_4.png";
import MasteryIcon5 from "../../assets/mastery_icon_5.png";
import MasteryIcon6 from "../../assets/mastery_icon_6.png";
import MasteryIcon7 from "../../assets/mastery_icon_7.png";

function MasteryPopup({ champion, popupOn }) {
  const [mousePos, setMousePos] = useState({});

  const getMasteryIcon = () => {
    switch (champion.championLevel) {
      case 7:
        return MasteryIcon7;
      case 6:
        return MasteryIcon6;
      case 5:
        return MasteryIcon5;
      case 4:
        return MasteryIcon4;
      default:
        return MasteryIconDefault;
    }
  };

  useEffect(() => {
    const offset = { x: 10, y: 0 };

    const handleMouseMove = (event) => {
      let bounds = event.target.getBoundingClientRect();
      setMousePos({
        x: event.clientX - bounds.left + offset.x,
        y: event.clientY - bounds.top + offset.y,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return popupOn ? (
    <div className="MasteryPopup" style={{ top: mousePos.y, left: mousePos.x }}>
      <img className="MasteryIcon" src={getMasteryIcon()} alt="" />
      <div>
        <h1>{`Level ${champion.championLevel}`}</h1>
        <div className="ProgressBar Mini">
          <div
            className="Progress"
            style={{
              width: `${
                (champion.championPoints /
                  (champion.championPoints +
                    champion.championPointsUntilNextLevel)) *
                100
              }%`,
            }}
          />
          {champion.championPointsUntilNextLevel > 0 ? (
            <h1>
              {`${champion.championPoints.toLocaleString()}/${(
                champion.championPoints + champion.championPointsUntilNextLevel
              ).toLocaleString()}`}
            </h1>
          ) : (
            <h1>{`${champion.championPoints.toLocaleString()}`}</h1>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
}

export default MasteryPopup;
