import { menuItems } from "./menuItems";
import '../../../index.scss'
import './navbar.scss'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavBar = (props:any) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ activeNavBarItem, setActiveNavBarItem ] = useState<string>();
    const location = useLocation();

    useEffect(() => {
        setActiveNavBarItem(location.pathname);
    }, [])

    return (
        <div className="navbar">
            <div className="navbar-logo">
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
                               
                                if (item?.element) {
                                    const element = document.getElementById(item.element);
                                    if (element)  element.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    if ( item.newTab ) {
                                        window.open(item.url);
                                    } else {
                                        window.location.replace(item.url)
                                    }
                                }

                            }}>
                              {item?.icon ?  <img  src={item.icon}/>  : ''  }
                              { item.title }
                            </div>
                        )
                })

                }
            </div>
        </div>
    )
}

export default NavBar;