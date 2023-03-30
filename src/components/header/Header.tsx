import './header.scss';
import NavBar from './navBar/NavBar';

const Header = () => {

    return (
        <div className='header'>
            <div className='header-left'>
                <NavBar/>
            </div>
            <div className='header-right'></div>
        </div>
    )
}

export default Header;