import { useCallback, useEffect, useMemo, useState } from 'react';
import './customCountDown.scss';
import Countdown from "react-countdown";
import axios from 'axios';

const CustomCountDown = () => {

    const calculateTimeLeft = () => {
        if( serverEndTime) {
            let year = new Date().getFullYear();
            let difference = +new Date(serverEndTime) - +new Date();

            let timeLeft:any = {};

            if (difference > 0) {
              timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
              };
            } else {
                timeLeft = {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                  };
            }

            return timeLeft;
        }
      }

    const [serverEndTime, setServerEndTime] = useState<string>()
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/count-down-end-date`).then((res) => {
            setServerEndTime(res.data.data.attributes.endDate);
        })
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });
    return(
        <div className="customCountDown">
           <div className='customCountDown-renderer'>
            <div style={{ marginRight: 30}} className={'customCountDown-renderer-item'}>
                <p>{timeLeft?.days < 10 ? '0' + timeLeft?.days : timeLeft?.days}</p>
                <div className='customCountDown-renderer-type'>Dzien</div>
            </div>

            <div>
                <p>{timeLeft?.hours < 10 ? '0' + timeLeft?.hours : timeLeft?.hours}</p>
                <div className='customCountDown-renderer-type'>Hours</div>
            </div>

            <div>:</div>

            <div>
                <p>{timeLeft?.minutes < 10 ? '0' + timeLeft?.minutes : timeLeft?.minutes }</p>
                <div className='customCountDown-renderer-type'>Minutes</div>
            </div>

            <div>:</div>

            <div>
                <p>{ timeLeft?.seconds < 10 ? '0' + timeLeft?.seconds : timeLeft?.seconds}</p>
                <div className='customCountDown-renderer-type'>Seconds</div>
            </div>
        </div>
        </div>
    )
}

export default CustomCountDown;