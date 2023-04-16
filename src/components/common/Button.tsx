import styled from 'styled-components';

const StyledButton = styled.div<{ width: string, height: string }>`
    width: ${(props: any)=> [props.width]};
    height: ${(props: any)=> [props.height]};
    background-color: #954580;
    color: #fff;
    cursor: pointer;
    padding: 2px;
    text-align: center;
    line-height: ${(props: any)=> [props.height]};
    margin: 5px;
    border-radius: 10px;
    font-size: 22px;
    padding: 10px;
    transition: 0.3s ease-in-out;
    &:hover {
        background-color: #6149F5;
    }
    @media only screen and (max-width: 376px) {
        font-size: 18px;
        width: 300px !important;
    }

    @media only screen and (max-width: 480px) {
        font-size: 18px;
        width: 180px !important;
    }

    @media only screen and (max-width: 768px) {
        font-size: 18px;
        width: 250px !important;
    }


    @media only screen and (max-width: 1024px) {
        font-size: 18px;
        width: 200px !important;
    }
`

export enum ButtonTypes {
    default = 'DEFAULT'
}

interface ButtonProps {
    type: ButtonTypes;
    height?: string;
    width?: string;
    handleClick: any;
    children?: any;
    className?: string;

}

const Button = (props: ButtonProps) => {
    const  {height = '50px', width = 'auto',  type = ButtonTypes.default, handleClick, className} = props;

    const onClick = () => {
        handleClick?.();
    }
    return (
        <StyledButton className={className ?? ''} height={height} width={width} onClick={onClick} >{props.children}</StyledButton>
    )
}

export default Button;