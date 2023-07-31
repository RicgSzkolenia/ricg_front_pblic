import { useEffect, useState } from "react";
import PartnerApi from "../../utils/apis/PartnerApi";
import styled from "styled-components";

const StyledPartnersSection = styled.div`
    max-width: 1440px;
    width: 94%;
    margin: 70px auto;
    p {
        text-align: center;
    }
`

const StyledPartners = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const StyledBrandWrapper = styled.div`
    margin: 30px;
    img {
        height: 75px;
        max-width: 350px;
    }


`

const PartnersSection = () => {
    const [ partners, setPartners ] = useState<any>([]);
    useEffect(() => {
        PartnerApi.getAllPartners().then((partner:any) => {
            setPartners(partner.data.data);

        })
    }, [])

    return (
        <StyledPartnersSection  id="partners">
            <p className="blueSecondaryHeader"> Naszi partnerze</p>
            <StyledPartners>
                { partners.map((partner:any) => {
                    console.log(partner);
                    return(
                        <StyledBrandWrapper>
                            <img src={partner?.attributes?.partnerImage.data.attributes.url}></img> 
                        </StyledBrandWrapper>
                    )
                }) }
            </StyledPartners>
        </StyledPartnersSection>
    )
}

export default PartnersSection;