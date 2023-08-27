import styled from "styled-components";
import { colors } from "../../colors";
import { useEffect, useState } from "react";
import ContactInfoApi from "../../utils/apis/ContactInfoApi";

const StyledFooter = styled.div`
    height: 150px;
    width: 100%;
    background-color: ${colors.thirdColor};
    padding-top: 15px;
    img {
        display: block;
        height: 55px;
        margin: 0px auto;
        
        @media only screen and (min-width: 356px) and (max-width: 480px) {
            height: 35px;
        }
    
    }

`
const StyledContactWrapper = styled.div`
    color: #fff;
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    div {
        margin: 2.5px;
        display: block;
        p {
            margin: 10px;
            display: inline;
        }

        a {
            cursor: pointer; 
            color: #fff;
            text-decoration: none;
        }
    }
`

const Footer = () => {

    const [ contactInfo, setContactInfo ] = useState<any>();

    useEffect(() => {
        ContactInfoApi.getContactInfo().then((info:any) => {
            setContactInfo(info);
        })
    }, [])

    return (
        <StyledFooter>
             <img src="https://res.cloudinary.com/dtb1fvbps/image/upload/v1686685604/logo_White_F_8df86b15c6.svg"></img>
            <StyledContactWrapper>
                <div>
                    <p>{contactInfo?.phoneNumber}</p>
                    <p>{contactInfo?.email}</p>
                </div>
                <div>
                    <p>{ contactInfo?.adress }</p>
                </div>
                <div>
                    <a target="_blank" href={contactInfo?.regulation?.data?.attributes?.url}>Regulamin</a>
                </div>
            </StyledContactWrapper>
        </StyledFooter>
    )
}

export default Footer;