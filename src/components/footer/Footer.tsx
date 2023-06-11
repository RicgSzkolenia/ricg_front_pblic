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
            <img src={'./BigLogo.png'}></img>
        </StyledFooter>
    )
}

export default Footer;