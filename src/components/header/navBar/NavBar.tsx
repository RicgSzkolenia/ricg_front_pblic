import { menuItems } from "./menuItems";
import './navbar.scss'
import '../../../index.scss'
import Button, { ButtonTypes } from "../../common/Button";
import MenuItemDropDown from "../../common/MenuItemDropDown";

const NavBar = (props:any) => {
    return (
        <div className="navbar" data-aos="fade-down"  data-aos-delay="300" data-aos-duration="2000">
            <div className="navbar-logo">
                <img  src={"/logo.png"}></img>
            </div>
            <div className="navbar-menu">
                { menuItems.map((item, index) => {
                        if ( !item?.subItems ) {
                            return (
                                <div className="navbar-menu-item" key={index}>
                                    {item.title}
                                </div>
                                );
                        } else {
                            return (
                                <MenuItemDropDown title={item.title} url={item.url} items={item.subItems || []}/>
                            )
                        }
                    })
                }
                <Button id='navbar-action' type={ButtonTypes.default} handleClick={() => {
                    props?.coursesCarouselRef?.current?.scrollIntoView()
                }}>Kup Webinar</Button>
            </div>
        </div>
    )
}

export default NavBar;