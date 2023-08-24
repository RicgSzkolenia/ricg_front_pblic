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
import AuthorSection from "../../components/authorSection";
import OpinionSection from "../../components/opinionSection/OpinionSections";

const Home = () => {
  const coursesCarouselRef = useRef<any>(null);
  const contactRef = useRef<any>(null);
  const [preloader, setPreloader] = useState<boolean>(false);
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [ authorCourseBlock, setAuthorCourseBlock ] = useState<ImageTextBlock>();
  const [ imageTextBlocks, setImageTextBlocks ] = useState<Array<ImageTextBlock>>([]);
 

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

  }, []);

  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className="home">
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
          <div
            id="courses"
            className="home-course-title"
            data-aos={"fade-down"}
            data-aos-duration="1500"
            data-aos-delay="150">
            <p ref={coursesCarouselRef} className=" blueSecondaryHeader">Zapraszamy na Webinar!</p>
          </div>
          <div className="home-course-types">
            <CustomCarousel settings={customCarouselSettingsConstants.customCourseCarouselSettings}>
              {courses.map((course, index) => {
                return (
                  <CourseCard
                    key={index}
                    course={course}
                  />
                );
              })}
            </CustomCarousel>
          </div>
          <PartnersSection/>
          <TiktokVidsSection/>
          <OpinionSection/>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
