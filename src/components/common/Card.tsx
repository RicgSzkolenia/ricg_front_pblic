import { ReactNode } from "react";
import styled from "styled-components";


const StyledCard = styled.div`
    margin: 20px;
    padding: 20px;
    width: 230px;
    height: 280px;
    border: 4px solid #256480;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
`
interface ICardProps {
    className: string
}

const Card = ({children, className}:any) => {

    return (
        <StyledCard className={className}>
            {children}
        </StyledCard>
    )
}

export default Card;