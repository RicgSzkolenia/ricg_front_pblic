import { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../../colors";


const StyledCard = styled.div`
    margin: 20px;
    padding: 5px;
    width: 220px;
    height: 250px;
    border: 4px solid ${colors.primaryColor};
    border-radius: 15px;
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    transition: 0.3s ease-in-out !important;
    background-color: #FFF9F9;

    &:hover {
        transform: scale(1.05);
    }

    @media only screen and (max-width: 480px) {
        width: 160px;
        height: 200px;
        padding: 5px;
        margin: 7px;
        overflow: hidden;
    }

    @media only screen and (min-width: 480px) and (max-width: 568px) {
        height: 300px;
        width: 200px;
        margin: 7px;
        overflow: hidden;
    }

    @media only screen and (min-width: 569px) and (max-width: 768px) {
        height: 300px;
        width: 245px;
        margin: 7px;
        overflow: hidden;
    }

    @media only screen and (min-width: 769px) and (max-width: 1024px) {
        height: 270px;
        width: 240px;
        margin: 5px 5px;
        overflow: hidden;
    }
`
interface ICardProps {
    className: string
}

const Card = ({children, className}:any) => {

    return (
        <StyledCard data-aos="flip-up" data-aos-duration="2000" className={className}>
            {children}
        </StyledCard>
    )
}

export default Card;