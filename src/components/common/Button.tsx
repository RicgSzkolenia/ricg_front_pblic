import styled from 'styled-components';

const StyledButton = styled.div`
    min-width: 85px;
    max-width: 250px;
    height: 35px;
    background-color: #9c5b89;
    color: #fff;
    cursor: pointer;
    padding: 0 25px;
    text-align: center;
    line-height: 35px;
    margin: 5px;
    border-radius: 10px;
    font-size: 20px;
    transition: 0.3s ease-in-out;
    &:hover {
        transform: scale(1.06);
        background-color: #6149F5;
    }
    @media only screen and (max-width: 376px) {
        font-size: 14px;
        width: 185px !important;
        height: 30px;
        line-height: 30px;
    }

    @media only screen and (min-width: 377px) and (max-width: 480px) {
        font-size: 14px;
        width: 150px;
        height: 25px !important;
        line-height: 25px !important;

    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        font-size: 16px;
        width: 250px;
    }


    @media only screen and (min-width: 769px) and (max-width: 1024px) {
        font-size: 16px;
        width: 200px;
    }
`

export enum ButtonTypes {
    default = 'DEFAULT'
}

interface ButtonProps {
    type: ButtonTypes;
    handleClick: any;
    children?: any;
    className?: string;
    id?:string;
}

const Button = (props: ButtonProps) => {
    const  { type = ButtonTypes.default, handleClick, className, id} = props;

    const onClick = () => {
        handleClick?.();
    }
    return (
        <StyledButton id={id ?? ''} className={className ?? ''} onClick={onClick} >{props.children}</StyledButton>
    )
}

export default Button;