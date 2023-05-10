
import './customCarousel.scss';
import Slider from "react-slick";
import CustomCarouselArrow from "../carouselSection/CustomCarouselArrow";

const CustomCarousel = (props:any) => {


    return (
        <div className="customCarousel">
            <Slider {...props.settings}>
                {props.children}
            </Slider>
        </div>
    )
}

export default CustomCarousel;