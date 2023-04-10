import Slider from "react-slick";
import CustomCarouselArrow from "../carouselSection/CustomCarouselArrow";

const CustomCarousel = (props:any) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <CustomCarouselArrow/>,
        prevArrow: <CustomCarouselArrow reverse={true} />,
        ...props.settings
    };

    return (
        <div>
            <Slider {...settings}>
                {props.children}
            </Slider>
        </div>
    )
}

export default CustomCarousel;