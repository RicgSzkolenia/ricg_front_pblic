import styled from "styled-components";

const StyledModal = styled.div<{}>`
    z-index: 9000000000000;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 800px;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    filter: drop-shadow(5px 5px 10px #000);

    @media only screen and (max-width: 480px) {
        overflow: hidden;
        width: 350px;
        height: 550px;
    }
`

const Modal = (props:any) => {

    const handleClose = () => {
        props?.close?.()
    }

    return (
        <StyledModal>
            {/* <StyledModalHeader>
                <StyledCloseButton onClick={handleClose}>
                    <img src="./xmark-solid.svg"></img>
                </StyledCloseButton>
            </StyledModalHeader> */}
                {props.children}
            
        </StyledModal>
    )
}

export default Modal;