
import './customCarousel.scss';
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
        ...props.settings,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 420,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                rows: 1,
              }
            }
          ]
    };

    return (
        <div className="customCarousel">
            <Slider {...settings}>
                {props.children}
            </Slider>
        </div>
    )
}

export default CustomCarousel;