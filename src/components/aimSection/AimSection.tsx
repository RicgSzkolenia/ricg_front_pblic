import "./aimSection.scss";
import { aims } from "./aimItems";
import Card from "../common/Card";

const AimSection = () => {
  return (
    <div className="aims">
      <p className="blueSecondaryHeader aims-header" data-aos="fade-up">
        {" "}
        Cele Webinaru{" "}
      </p>
      <div className="aims-cardWrapper">
        {aims.map((aim) => {
          return (
            <Card className="aimsś-card">
              <img src={aim.icon}></img>
              <p>{aim.text}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AimSection;
