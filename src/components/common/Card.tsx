import { ReactNode } from "react";
import styled from "styled-components";


const StyledCard = styled.div`
    margin: 20px;
    padding: 20px;
    width: 230px;
    height: 250px;
    border: 4px solid #256480;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;

    @media only screen and (max-width: 480px) {
        width: 155px;
        height: 200px;
        padding: 5px;
        margin: 7px;
    }

    @media only screen and (min-width: 480px) and (max-width: 768px) {
        height: 315px;
        width: 185px;
        margin: 7px;
    }

    @media only screen and (min-width: 769px) and (max-width: 1024px) {
        height: 290px;
        width: 195px;
        margin: 5px;
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