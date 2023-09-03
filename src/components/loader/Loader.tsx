import { Rings } from "react-loader-spinner";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loader = () => {

    return (
        <SpinnerWrapper>
        <Rings
            height="180"
            width="180"
            wrapperStyle={{ display: 'block' }}
            color="#e3746d"
            ariaLabel="puff-loading"
            visible={true}/>
    </SpinnerWrapper>
    )
}

export default Loader;