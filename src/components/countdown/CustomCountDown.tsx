import "./customCountDown.scss";
import Countdown from "react-countdown";

const countdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  return (
    <div className="customCountDown-renderer">
      <div
        style={{ marginRight: 30 }}
        className={"customCountDown-renderer-item"}
      >
        <p>{days < 10 ? "0" + days : days}</p>
        <div className="customCountDown-renderer-type">Dzien</div>
      </div>

      <div>
        <p>{hours < 10 ? "0" + hours : hours}</p>
        <div className="customCountDown-renderer-type">Hours</div>
      </div>

      <div>:</div>

      <div>
        <p>{minutes < 10 ? "0" + minutes : minutes}</p>
        <div className="customCountDown-renderer-type">Minutes</div>
      </div>

      <div>:</div>

      <div>
        <p>{seconds < 10 ? "0" + seconds : seconds}</p>
        <div className="customCountDown-renderer-type">Seconds</div>
      </div>
    </div>
  );
};

const CustomCountDown = () => {
  return (
    <div className="customCountDown">
      <Countdown date={Date.now() + 150000000} renderer={countdownRenderer} />
    </div>
  );
};

export default CustomCountDown;
