import './preloader.scss';

const Preloader = () => {
  return(
        <div className="draw-container">
          <div className="draw">
            <div className="rocket">
              <div className="window"></div>
            </div>
            <div className="smoke">
              <div className="one"></div>
              <div className="cloud two"></div>
              <div className="cloud four"></div>
              <div className='three'> </div>
            </div>

            <div className="stars">
              <div className="star one"></div>
              <div className="star two small"></div>
              <div className="star three small"></div>
              <div className="star four small"></div>
              <div className="star five"></div>
              <div className="star six samll"></div>
              <div className="star seven"></div>
              <div className="star eight small"></div>
            </div>
          </div>
        </div>
  )
}

export default Preloader;