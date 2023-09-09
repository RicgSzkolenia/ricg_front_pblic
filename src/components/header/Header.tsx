import Button, { ButtonTypes } from "../common/Button";
import "./header.scss";
import PerfomanceBar from "./perfomanceBar/PerfomanceBar";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

const Header = (props:any) => {

  const navigate  = useNavigate();
  return (
    <div className="header-wrapper section-top-bottom-margin">
        <div className="header-content">
          <div
            className="header-content-left"
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="300"
          >
            <TypeAnimation
              sequence={[
                "Wystartuj z nami-",
                1500,
              ]}
              wrapper="p"
              cursor={false}
              repeat={0}
              className="blackSecondaryHeader"
            />
            <TypeAnimation
              sequence={[
                1000,
                `rynek pracy
                 bez tajemnic`
              ]}
              speed={{type: "keyStrokeDelayInMs", value: 20}}
              wrapper="p"
              cursor={true}
              repeat={0}
              style={{ whiteSpace: "pre-line" }}
              className="blueHeader"
            />
            <div className="header-content-left-arrow">
              <img src={"/ArrowRight.svg"} />
              <Button
                id="header-content-left-arrow-button"
                type={ButtonTypes.default}
                handleClick={ () => {
                  navigate('/products');
                }}
              >
                KUP WEBINAR
              </Button>
            </div>
          </div>
          <div
            className="header-content-right"
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-delay="300"
          >
            <img
              src={"/group_header.png"}
              style={{ width: "80%", height: "auto" }}
            ></img>
          </div>
        </div>
        <PerfomanceBar />
    </div>
  );
};

export default Header;
