import styled from "styled-components";
import { colors } from "../../colors";

const StyledFooter = styled.div`
    height: 60px;
    width: 100%;
    background-color: ${colors.thirdColor};
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
   
    img {
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translate(-50%, 0);
        height: 55px;
        margin-top: 1.5px;
        margin: 0 auto;
        @media only screen and (min-width: 356px) and (max-width: 480px) {
            height: 35px;
        }
    
    }

`

const Footer = () => {

    return (
        <StyledFooter>
             <img src="https://res.cloudinary.com/dtb1fvbps/image/upload/v1686685604/logo_White_F_8df86b15c6.svg"></img>
        </StyledFooter>
    )
}

export default Footer;