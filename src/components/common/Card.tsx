import { ReactNode } from "react";
import styled from "styled-components";


const StyledCard = styled.div`
    margin: 5px;
    padding: 15px;
    width: 280px;
    height: 300px;
    border: 4px solid #256480;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
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