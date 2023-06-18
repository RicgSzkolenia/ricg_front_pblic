import React, { useState, useEffect, useRef } from "react";
import "./home.scss";
import "aos/dist/aos.css";
import AOS from "aos";
import AimSection from "../../components/aimSection/AimSection";
import CarouselSection from "../../components/carouselSection/CarouselSection";
import ContactForm from "../../components/contactForm/Contactform";
import Header from "../../components/header/Header";
import ImageTextSection from "../../components/imageTextSection/ImageTextSection";
import Countdown from "react-countdown";
import CustomCountDown from "../../components/countdown/CustomCountDown";
import ProgressBar from "../../components/common/ProgressBar";
import CustomCarousel from "../../components/customCarousel/CustomCarousel";
import Card from "../../components/common/Card";
import Button, { ButtonTypes } from "../../components/common/Button";
import CourseCard from "../../components/courseCard/CourseCard";
import OpinionCard from "../../components/opinionCard/OpinionCard";
import Footer from "../../components/footer/Footer";
import Preloader from "../../components/preloader/Preloader";
import { ImageTextBlock } from "../../utils/models/ImageTextBlock";
import { Opinion } from "../../utils/models/Opinion";
import { Course } from "../../utils/models/Course";
import courseApi from "../../utils/apis/CourseApi";
import imageTextSectionApi from "../../utils/apis/ImageTextSectionApi";
import opinionApi from "../../utils/apis/OpinionApi";
import customCarouselSettingsConstants from "../../components/customCarousel/customCarouselSettingsConstants";
import { TikTokEmbed } from "react-social-media-embed";
import TiktokVidsSection from "../../components/tiktokVids/TikTokVidsSection";

const Home = () => {
  const coursesCarouselRef = useRef<any>(null);
  const contactRef = useRef<any>(null);
  const [preloader, setPreloader] = useState<boolean>(false);
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [ authorCourseBlock, setAuthorCourseBlock ] = useState<ImageTextBlock>();
  const [ imageTextBlocks, setImageTextBlocks ] = useState<Array<ImageTextBlock>>([]);
  const [ opinions, setOpinions ] = useState<Array<Opinion>>([]);

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

    opinionApi.getAllOpinions().then((opinions:any) => {
      setOpinions(opinions)
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
          <ImageTextSection
            imageLink={authorCourseBlock?.image || ''}
            title={authorCourseBlock?.title || ''}
            subTitle={authorCourseBlock?.subTitle}
            text={authorCourseBlock?.text || ''}
            reverse={authorCourseBlock?.reverse}
          />
          <CarouselSection title="Co wyróżnia nasz webinar?" />
          <TiktokVidsSection/>
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

          <div
            className="home-course-title"
            data-aos={"fade-down"}
            data-aos-duration="1500"
            data-aos-delay="150">
            <p ref={coursesCarouselRef} className=" blueSecondaryHeader">Zapraszamy na Webinar!</p>
            <CustomCountDown />
            <ProgressBar className={"home-progressBar"} progress={80} />
          </div>
          <div className="home-course-types">
            <CustomCarousel settings={customCarouselSettingsConstants.customCourseCarouselSettings}>
              {courses.map((course, index) => {
                return (
                  <CourseCard
                    key={index}
                    id={course!.id || ''}
                    title={course.title}
                    type={course.type}
                    points={course.points}
                    price={course.price}
                    link={course.link}
                  />
                );
              })}
            </CustomCarousel>
          </div>
          <div
            className="home-reviews"
            data-aos={"fade-down"}
            data-aos-duration="1500"
            data-aos-delay="150"
          >
            <p className="home-reviews-title blueSecondaryHeader">
              Opinie O Kursie
            </p>
            <CustomCarousel
              settings={customCarouselSettingsConstants.customOpinionCarouselSettings}
            >
              {opinions.map((opinion, index) => {
                return (
                  <div key={index}>
                    <OpinionCard
                      opinion={opinion}
                    />
                  </div>
                );
              })}
            </CustomCarousel>
          </div>
          <div className="home-contact">
            <p
              className="home-course-title blueSecondaryHeader"
              data-aos={"fade-down"}
              data-aos-duration="1500"
              data-aos-delay="150"
            >
              Kontakt
            </p>
            <div className="home-contact-wrapper">
              <div
                className="home-contact-info"
                data-aos={"fade-left"}
                data-aos-duration="1500"
                data-aos-delay="150"
              >
                <p className="blueSmallText">
                  Bądź najlepszą wersją siebie na rozmowie o pracę!
                </p>
                <img src={"./roseIcons/illustrationContact.svg"}></img>
              </div>
              <div
                ref={contactRef}
                className="home-contact-form"
                data-aos={"fade-right"}
                data-aos-duration="1500"
                data-aos-delay="150"
              >
                <ContactForm />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
