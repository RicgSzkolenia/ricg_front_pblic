import { ReactNode } from "react";
import styled from "styled-components";


const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    aling-items: center;
    margin: 5px;
    width: 280px;
    height: 320px;
    border: 3px solid #256480;
    border-radius: 10px;
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