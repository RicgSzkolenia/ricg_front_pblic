import { menuItems } from "./menuItems";
import '../../../index.scss'
import './navbar.scss'
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import { trackGoogleAnalyticsEvent } from "../../../utils/hooks/useAnalytics";

const NavBar = (props:any) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ activeNavBarItem, setActiveNavBarItem ] = useState<string>();
    const location = useLocation();
    const navigate = useNavigate();
    const cartItems = useSelector((state: AppState) => state.cart.items );

    useEffect(() => {
        setActiveNavBarItem(location.pathname);
    }, [])

    const goToCart = () => {
        navigate('/cart')
    }

    return (
        <div className="navbar">
            <div className="navbar-logo" onClick={() => {
                navigate('/');
            }}>
                <img  src={"/Group_logo.png"}></img>
            </div>
            <div className="navbar-burger" onClick={() => {
                setIsOpen(!isOpen);
            }}>
                { isOpen ? <img src='https://res.cloudinary.com/dtb1fvbps/image/upload/v1686862403/bars_staggered_solid_f7cc524bc5.svg'/> : <img src='https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/bars_solid_dd92a50ba6.svg'/>}
            </div>
            <div className={isOpen ? "navbar-menu-open" : "navbar-menu" }>
                { menuItems.filter((item) => item.parent ? item.parent === location.pathname : true).map((item, index) => {
                        return(
                            <div  key={index} className={`navbar-menu-item  ${ item.url === activeNavBarItem ? 'navbar-active' : '' }`} onClick={() => {
                                trackGoogleAnalyticsEvent('social', item?.title ?? item.url, item.url, { item: JSON.stringify(item) })
                                if (item?.element) {
                                    const element = document.getElementById(item.element);
                                    if (element)  element.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    if ( item.newTab ) {
                                        window.open(item.url);
                                    } else {
                                       navigate(item.url)
                                    }
                                }

                            }}>
                              {item?.icon ?  <img  src={item.icon}/>  : ''  }
                              { item.title }
                            </div>
                        )
                })}
                <div className="navbar-menu-item navbarCart" onClick={goToCart}>
                    <img src="./cart.png" alt="Cart"></img>
                    <p>{cartItems?.reduce((acc, cur) => {
                        return acc + cur.quantity
                    }, 0) ?? '0'}</p>
                </div>
            </div>
        </div>
    )
}

export default NavBar;