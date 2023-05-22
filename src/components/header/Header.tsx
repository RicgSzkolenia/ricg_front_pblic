import Button, { ButtonTypes } from "../common/Button";
import "./header.scss";
import NavBar from "./navBar/NavBar";
import PerfomanceBar from "./perfomanceBar/PerfomanceBar";
import ReactTypingEffect from "react-typing-effect";
import { TypeAnimation } from "react-type-animation";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";

const Header = () => {

  const stripePromise = loadStripe('pk_test_51N6g4qAxQ1CFxjjOkikYlfumtOZyWVyImkVvsRO9HBEX2ux2j4NltR7qXB26oET7kMS0I02qdU0vzTOMsV56ZxXS00TZQApF0E');

  const handlePayment = async () => {
      try {

        const stripe = await stripePromise;

          const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, {
            products: [ { id: 1, title: 'Webinar', price: '239' } ],
          })

          await stripe?.redirectToCheckout({
            sessionId: res.data.stripeSession.id
          })

      } catch(err) {
        console.log(err);
      }
  }


  return (
    <div className="header-wrapper">
      <div className="header">
        <NavBar />
        {/* <div id='radialBlur'></div> */}
        <div className="header-content">
          <div
            className="header-content-left"
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="300"
          >
            <TypeAnimation
              sequence={[
                "Wystartuj z nami-", // Types 'One'
                1500, // Waits 1s
              ]}
              wrapper="p"
              cursor={false}
              repeat={0}
              className="blackSecondaryHeader"
            />
            <TypeAnimation
              sequence={[
                1200,
                `rynek pracy
                 bez tajemnic`
              ]}
              speed={{type: "keyStrokeDelayInMs", value: 50}}
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
                handleClick={handlePayment}
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
              src={"/GroupnewColor.svg"}
              style={{ width: "80%", height: "auto" }}
            ></img>
          </div>
        </div>
        <PerfomanceBar />
      </div>
    </div>
  );
};

export default Header;
