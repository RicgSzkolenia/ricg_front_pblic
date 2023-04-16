import Button, { ButtonTypes } from '../common/Button';
import './header.scss';
import NavBar from './navBar/NavBar';
import PerfomanceBar from './perfomanceBar/PerfomanceBar';

const Header = () => {

    return (
        <div className='header-wrapper'>
            <div className='header'>
                <NavBar/>
                {/* <div id='radialBlur'></div> */}
                <div className='header-content'>
                    <div className='header-content-left' data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
                        <p className='blackSecondaryHeader'>Wystartuj z nami-</p>
                        <p className='blueHeader'>rynek pracy <br></br>bez tajemnic</p>
                        <div className='header-content-left-arrow'>
                            <img  src={'/ArrowRight.svg'}/>
                            <Button type={ButtonTypes.default} height='20px' width='150px' handleClick={undefined}>KUP WEBINAR</Button>
                        </div>
                    </div>
                    <div className='header-content-right' data-aos="fade-left" data-aos-duration="1500" data-aos-delay="300">
                        <img src={'/GroupnewColor.svg'} style={{"width": "80%", height: "auto"}}></img>
                    </div>
                </div>
                <PerfomanceBar/>
            </div>
        </div>
    )
}

export default Header;