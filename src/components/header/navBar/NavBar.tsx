import { menuItems } from "./menuItems";
import '../../../index.scss'
import './navbar.scss'
import { useState } from "react";

const NavBar = (props:any) => {

    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className="navbar" data-aos="fade-down"  data-aos-delay="300" data-aos-duration="2000">
            <div className="navbar-logo">
                <img  src={"/Group_logo.png"}></img>
            </div>
            <div className="navbar-burger" onClick={() => {
                setIsOpen(!isOpen);
            }}>
                { isOpen ? <img src='https://res.cloudinary.com/dtb1fvbps/image/upload/v1686862403/bars_staggered_solid_f7cc524bc5.svg'/> : <img src='https://res.cloudinary.com/dtb1fvbps/image/upload/v1686861783/bars_solid_dd92a50ba6.svg'/>}
            </div>
            <div className={isOpen ? "navbar-menu-open" : "navbar-menu" }>
                { menuItems.map((item, index) => {
                        return(
                            <div key={index} className="navbar-menu-item" onClick={() => {
                                window.location.replace(item.url)
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