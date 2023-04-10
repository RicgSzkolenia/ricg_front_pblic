import styled from "styled-components";

const StyledFooter = styled.div`
    height: 60px;
    width: 100%;
    background-color: #50b2dd;
    position: relative;
    img {
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translate(-50%, 0);
        height: 55px;
        margin-top: 1.5px;
        margin: 0 auto;
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