import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { MenuItem } from "../header/navBar/menuItems";

const StyledMenuItemDropDown = styled.div`
    font-size: 32px;
    line-height: 32px;
    font-family: 'Source Sans Pro';
    position: relative;
    cursor: pointer;

    a{
        color: #000;
        text-decoration: none;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    img {
        margin-top: 11px;
        margin-left: 5px;
    }
`

const StyledDrop = styled.div`
    position: absolute;
    top: 40px;
    width: 200px;
    font-size: 20px;
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
            <div className="header" onClick={() => {setIsDropShown(!isDropShown)}}>{ title } <img src={'/arrow_down_small.svg'}></img></div>
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