import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { MenuItem } from "../header/navBar/menuItems";

const StyledMenuItemDropDown = styled.div`
    font-size: 24px;
    line-height: 32px;
    font-family: 'Source Sans Pro';
    position: relative;
    cursor: pointer;

    @media only screen and (max-width: 480px) {
        font-size: 18px;
        width: 70px;
    }

    a{
        color: #000;
        text-decoration: none;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100px;

        img {
            transition: ease 0.3s;
            margin-top: 5px;
            margin-left: 5px;
            margin-right: 5px;
        }

        .arrow_turned_right {
            transform: rotate(90deg);
        }
    }
`

const StyledDrop = styled.div`
    position: absolute;
    top: 70px;
    left: 0;
    width: 200px;
    font-size: 18px;
    z-index: 2;

`

interface IMenuItemDropDownProps {
    title: string;
    url: string;
    items: Array<MenuItem>
    className?:string;
}
const MenuItemDropDown = (props: IMenuItemDropDownProps) => {
    const { title, items, className } = props;
    const [ isDropShown, setIsDropShown ] = useState<boolean>(false);

    return (
        <StyledMenuItemDropDown className={className} >
            <div className="header" onClick={() => {setIsDropShown(!isDropShown)}}>
                 <p>{ title }</p> 
                 <img className={ isDropShown? `arrow_turned_down` : `arrow_turned_right`} src={'/arrow_down_small.svg'}></img>
            </div>
            { isDropShown? <StyledDrop>
               {
                items?.map((item) => {
                    return (
                        <div className="sublist-item">
                            <Link to={item?.url}>{item?.title}</Link>
                        </div>
                    )
                })
               }
            </StyledDrop> : ''}
        </StyledMenuItemDropDown>
    )
}

export default MenuItemDropDown