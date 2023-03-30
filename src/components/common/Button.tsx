import styled from 'styled-components';

const StyledButton = styled.div`
    width: 140px;
    height: 40px;
    background-color: #50B2DD;
    color: #fff;
    cursor: pointer;
    padding: 2px;
    text-align: center;
    margin: 5px;
    border-radius: 10px;
    line-height: 40px;
    font-size: 26px;
`

export enum ButtonTypes {
    default = 'DEFAULT'
}

interface ButtonProps {
    type: ButtonTypes;
    height?: string;
    width?: string;
    handleClick: any;
    children: any;

}

const Button = (props: ButtonProps) => {
    const  {height = 50, width = 100,  type = ButtonTypes.default, handleClick} = props;

    const onClick = () => {
        handleClick?.();
    }
    return (
        <StyledButton onClick={onClick} >{props.children}</StyledButton>
    )
}

export default Button;