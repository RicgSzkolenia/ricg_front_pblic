import { useCallback } from "react";
import styled from "styled-components";

interface IProgressBar {
    progress: number;
    className?: string;
}

const StyledProgressBar = styled.div`
    width: 500px;
    height: 20px;
    background-color: #D9DFFF;
    position: relative;
    border-radius: 5px;
    margin-top: 30px;

    @media only screen and (max-width: 376px) {
        width: 280px;
    }

    @media only screen and (max-width: 391px) {
        width: 280px;
    }
`

const StyledProgress = styled.div<{ customWidth: number }>`
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    background-color: #1A0F91;
    border-radius: 5px;
    width: ${(props) => props.customWidth}px;
`

const ProgressBar = (props: IProgressBar) => {
    const { progress, className } = props
    const  countWidth = useCallback(() : number => {
        return 230;
    }, [progress])
    return (
        <StyledProgressBar className={className?? ''}>
            <StyledProgress customWidth={countWidth()}/>
        </StyledProgressBar>
    );
}

export default ProgressBar