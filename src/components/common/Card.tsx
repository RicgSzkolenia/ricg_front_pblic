import { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../../colors";


const StyledCard = styled.div`
    margin: 20px;
    padding: 40px 10px;
    width: 300px;
    height: 300px;
    border: 4px solid ${colors.primaryColor};
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;

    @media only screen and (max-width: 480px) {
        width: 175px;
        height: 220px;
        padding: 5px;
        margin: 7px;
    }

    @media only screen and (min-width: 480px) and (max-width: 568px) {
        height: 300px;
        width: 200px;
        margin: 7px;
    }

    @media only screen and (min-width: 569px) and (max-width: 768px) {
        height: 300px;
        width: 245px;
        margin: 7px;
    }

    @media only screen and (min-width: 769px) and (max-width: 1024px) {
        height: 250px;
        width: 200px;
        margin: 5px 5px;
    }
`
interface ICardProps {
    className: string
}

const Card = ({children, className, key}:any) => {

    return (
        <StyledCard data-aos="flip-up" data-aos-duration="2000" className={className}>
            {children}
        </StyledCard>
    )
}

export default Card;