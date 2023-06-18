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
`

const StyledModalHeader = styled.div<{}>`
    position: relative;
    height: 35px;
    width: 100%;
    border-bottom: 2px solid #eee;
    
`

const StyledModalBody = styled.div<{}>`
    padding: 5px;
`

const StyledCloseButton = styled.div<{}>`
    position: absolute;
    width: 20px;
    height: 20px;
    right: 20px;
    top: 5px;
`

const Modal = (props:any) => {

    const handleClose = () => {
        props?.close?.()
    }

    return (
        <StyledModal>
            <StyledModalHeader>
                <StyledCloseButton onClick={handleClose}>
                    <img src="./xmark-solid.svg"></img>
                </StyledCloseButton>
            </StyledModalHeader>
            <StyledModalBody>
                {props.children}
            </StyledModalBody>
            
        </StyledModal>
    )
}

export default Modal;