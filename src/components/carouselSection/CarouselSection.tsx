import './carosuelSection.scss'
import Slider from "react-slick";
import CustomCarouselArrow from './CustomCarouselArrow';
import { useEffect, useState } from 'react';
import coursePercItemApi from "../../utils/apis/CoursePercItemApi";
import { PercCarouselItem } from '../../utils/models/PercCarouselItem';
import Modal from '../modal/Modal';
import parse from 'html-react-parser';
import Button, { ButtonTypes } from '../common/Button';

interface ICarosuelProps {
    title: string;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  rows: 2,
  nextArrow: <CustomCarouselArrow/>,
  prevArrow: <CustomCarouselArrow reverse={true} />,
  responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          rows: 1
        }
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        }
      }
    ]
};


const CarouselSection = (props:ICarosuelProps) => {
    const { title } = props;

    const [ percItems, setPercItems ] = useState<Array<PercCarouselItem>>([])
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [currentSlide, setCurrentSlide] = useState<any>();

    useEffect(() => {
      coursePercItemApi.getCoursePercItems().then ((items:any) => {
        setPercItems(items);
      });
    }, [])

    const handleModalClose = () => {
      setIsModalOpen(false);
    }

    return(
        <div className="carouselSection">
            <p className="carouselSection-title blueSecondaryHeader">{title}</p>
            { isModalOpen && <Modal close={handleModalClose}>
              <div className='carouselSection-modal'>
                <img src={ currentSlide.image }></img>
                <div className='carouselSection-modal-content'>
                  <div className='carouselSection-modal-content-header'>
                    {currentSlide.title}
                  </div>
                  <div className='carouselSection-modal-content-text'>
                    {   parse(currentSlide.details || '')}
                  </div>
                  <div className='carouselSection-modal-content-button'>
                      <Button type={ButtonTypes.default} handleClick={handleModalClose}>Zamknij</Button>
                  </div>
                </div>
              </div>
            </Modal> }
            <Slider {...settings}>
               {[...percItems || []].map((slide, index) => {
                return (
                   <div key={index} className='carouselSection-slide' onClick={() => {
                      setIsModalOpen(true);
                      setCurrentSlide(slide);
                   }}>
                      <img src={slide.image}></img>
                      <div className='carouselSection-slide-text'>
                          {slide.title}
                      </div>
                      
                   </div>
                )
               })}
            </Slider>
        </div>
    )
}

export default CarouselSection;