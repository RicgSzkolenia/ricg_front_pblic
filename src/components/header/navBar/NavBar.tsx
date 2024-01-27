import { menuItems } from "./menuItems";
import '../../../index.scss'
import './navbar.scss'
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import { trackGoogleAnalyticsEvent } from "../../../utils/hooks/useAnalytics";
import ContactInfoApi from "../../../utils/apis/ContactInfoApi";

const NavBar = (props:any) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ activeNavBarItem, setActiveNavBarItem ] = useState<string>();
    const [ contactInfo, setContactInfo ] = useState<any>();
    const location = useLocation();
    const navigate = useNavigate();
    const cartItems = useSelector((state: AppState) => state.cart.items );

    useEffect(() => {
        ContactInfoApi.getContactInfo().then((info:any) => {
            setContactInfo(info);
        })
        setActiveNavBarItem(location.pathname);
    }, [])

    const goToCart = () => {
        navigate('/cart')
    }

    const handleMenuItemClick = (item:any) => {
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

    }
console.log(contactInfo)
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
                            <div  key={index} className={`navbar-menu-item  ${ item.url === activeNavBarItem ? 'navbar-active' : '' }`} onClick={() => { handleMenuItemClick(item) }}>
                              {item?.icon ?  <img  src={item.icon}/>  : ''  }
                              { item.title }
                            </div>
                        )
                })}
                <div  className={`navbar-menu-item`} onClick={() => {  window.open(contactInfo?.instaLink)}}>
                    <img src="https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/instagram_5bb61720e9.svg"></img>
                </div>
                <div  className={`navbar-menu-item`} onClick={() => {  window.open(contactInfo?.facebookLink)}}>
                    <img src="https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/facebook_2c866dc246.svg"></img>
                </div>
                <div  className={`navbar-menu-item`} onClick={() => {  window.open(contactInfo?.tiktokLink)}}>
                    <img src="https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/tiktok_2_c10db1b000.svg"></img>
                </div>
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