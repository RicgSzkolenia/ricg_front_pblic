import { useState, useEffect, useRef } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import AimSection from "../../components/aimSection/AimSection";
import CarouselSection from "../../components/carouselSection/CarouselSection";
import Header from "../../components/header/Header";
import ImageTextSection from "../../components/imageTextSection/ImageTextSection";
import CustomCarousel from "../../components/customCarousel/CustomCarousel";
import CourseCard from "../../components/courseCard/CourseCard";
import Footer from "../../components/footer/Footer";
import Preloader from "../../components/preloader/Preloader";
import { ImageTextBlock } from "../../utils/models/ImageTextBlock";
import { Course } from "../../utils/models/Course";
import courseApi from "../../utils/apis/CourseApi";
import imageTextSectionApi from "../../utils/apis/ImageTextSectionApi";
import customCarouselSettingsConstants from "../../components/customCarousel/customCarouselSettingsConstants";
import TiktokVidsSection from "../../components/tiktokVids/TikTokVidsSection";
import PartnersSection from "../../components/PartnersSection/PartnersSection";
import AuthorSection from "../../components/authorSection/authorSection";
import OpinionSection from "../../components/opinionSection/OpinionSections";
import NavBar from "../../components/header/navBar/NavBar";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

const Home = () => {
  const navigate = useNavigate();
  const coursesCarouselRef = useRef<any>(null);
  const contactRef = useRef<any>(null);


  const [preloader, setPreloader] = useState<boolean>(false);
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [ authorCourseBlock, setAuthorCourseBlock ] = useState<ImageTextBlock>();
  const [ imageTextBlocks, setImageTextBlocks ] = useState<Array<ImageTextBlock>>([]);
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ course, setCourse ] = useState<Course>();


  const executeScroll = () => coursesCarouselRef.current.scrollIntoView();



  useEffect(() => {
    // animations
    setTimeout(() => setPreloader(false), 3020);
    AOS.init();
    AOS.refresh();

    // fetching data
    courseApi.getAllCourses().then((courses) => {
      setCourses(courses)
    })

    imageTextSectionApi.getAllImageTextBlocks().then((blocks) => {
      setImageTextBlocks(blocks)
    })

    imageTextSectionApi.getCourseAuthorBlock().then((block:ImageTextBlock) => {
      setAuthorCourseBlock(block);
    })

    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
      title: `Home`
    })

  }, []);

  const goToCart = () => {
    navigate('/cart')
  }

  const openModal = (course:Course) => {
    setIsModalOpen(true)
    setCourse(course)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className="home">
            { isModalOpen && <Modal close={handleModalClose} onOpen={openModal}>
              <div className='cart-modal'>
                    <p className="cart-modal-header">Dodano do koszyka!</p>
                    <p className="cart-modal-body">
                      Dodales do koszyka webinar: { course?.title }
                    </p>
                    <div className="cart-modal-actions">
                    <div className="cart-modal-actions-buttons" >
                        <div onClick={goToCart} className="cart-modal-actions-button">
                            Przejdź do koszyka
                            </div>
                            <div onClick={handleModalClose} className="cart-modal-actions-button">
                                Kontynuj Zakupy
                            </div>
                        </div>
                    </div>
              </div>
            </Modal> }
          <NavBar coursesCarouselRef={coursesCarouselRef} contactRef={contactRef}/>
          <Header contactref={contactRef} coursesCarouselRef={coursesCarouselRef} />
          <AimSection />
          { imageTextBlocks.map((block) => {
            return(
              <div key={block?.id}>
                <ImageTextSection
                    buttonAction={ executeScroll}
                    buttonName={"Dołącz do webinaru"}
                    imageLink={block.image}
                    title={block.title}
                    text={block.text}
                    reverse={block?.reverse}
                    />
              </div>
            )
          })}
          <AuthorSection/>
          <CarouselSection title="Co wyróżnia nasz webinar?" />
          <div className="section-top-bottom-margin">
            <div
              id="courses"
              className="home-course-title">
              <p ref={coursesCarouselRef} className=" blueSecondaryHeader section-header-top-bottom-margin">Zapraszamy na Online Webinar!</p>
            </div>
            <div className="home-course-types section-top-bottom-margin ">
              <CustomCarousel settings={customCarouselSettingsConstants.customCourseCarouselSettings}>
                {courses.map((course, index) => {
                  return (
                    <CourseCard
                      onModalOpen={openModal}
                      isOuterModal={true}
                      key={index}
                      course={course}
                    />
                  );
                })}
              </CustomCarousel>
            </div>   
          </div>
          <TiktokVidsSection/>
          <PartnersSection/>
          <OpinionSection/>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
