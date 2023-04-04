import './carouselarrow.scss'
import styled from "styled-components";

interface ICustomArrowProps {
    reverse?:boolean;
    style?: any;
    className?: string;
    onClick?: any
}

const CustomStyledArrow = styled.div`
    color: #000;
`

const CustomCarouselArrow  = (props:ICustomArrowProps) => {
    const { reverse, className, style, onClick } = props;

    return(
        <div onClick={onClick} style={ reverse ? { left: -10 } : { right: -10, rotate: '180deg'}} className={`customCarosuelArrow`} >
            <div className='customCarosuelArrow-stick'></div>
            <div className='customCarosuelArrow-stick'></div>
        </div>
    )
}

export default CustomCarouselArrow;