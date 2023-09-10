import styled from "styled-components";

const StyledModal = styled.div<{}>`
    z-index: 9000000000000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);

    .body {
        width: 75%;
        max-width: 800px;
        min-width: 300px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 10px;
        filter: drop-shadow(5px 5px 10px #000);
    }

    @media only screen and (max-width: 480px) {
        .body {
            overflow: hidden;
            width: 350px;
            height: 450px;
        }
      
    }
`

const Modal = (props:any) => {
    
    const handleClose = () => {
        props?.close?.()
    }

    return (
        <StyledModal> 
            <div className="body">
                {props.children}
            </div>
            
        </StyledModal>
    )
}

export default Modal;