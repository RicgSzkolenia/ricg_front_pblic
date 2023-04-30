import React, { useState, useEffect } from "react";
import "./home.scss";
import AimSection from "../../components/aimSection/AimSection";
import CarouselSection from "../../components/carouselSection/CarouselSection";
import ContactForm from "../../components/contactForm/Contactform";
import Header from "../../components/header/Header";
import ImageTextSection from "../../components/imageTextSection/ImageTextSection";
import Countdown from "react-countdown";
import CustomCountDown from "../../components/countdown/CustomCountDown";
import ProgressBar from "../../components/common/ProgressBar";
import CustomCarousel from "../../components/customCarousel/CustomCarousel";
import {
  courses,
  opinions,

  slides,
} from "../../components/carouselSection/slides";
import Card from "../../components/common/Card";
import Button, { ButtonTypes } from "../../components/common/Button";
import CourseCard from "../../components/courseCard/CourseCard";
import OpinionCard from "../../components/opinionCard/OpinionCard";
import Footer from "../../components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import Preloader from "../../components/preloader/Preloader";

const Home = () => {
  const [preloader, setPreloader] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setPreloader(false), 3020);
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className="home">
          <Header />
          <AimSection />
          <ImageTextSection
            imageLink="./MasterFoto.png"
            title={"Dlaczego warto się z nami spotkać?"}
            subTitile={"Paulina Laczek"}
            text={`Prezes Zarządu RICG. Ma ponad 20-letnie doświadczenie w branży HR. Prowadzi projekty doradztwa personalnego, procesy rekrutacyjne dla międzynarodowych korporacji i największych polskich spółek. 
              Jako doradca, mentor i headhunter inspiruje zarządy korporacji do wdrażania zmian, a menedżerów do rozwoju. Przeprowadziła z sukcesem kilkaset projektów executive search. Nie ma dla nich zadań niemożliwych do realizacji.

              Regularnie komentuje w mediach tematy związane z rynkiem pracy. Absolwentka MBA HR na Akademii Leona Koźmińskiego.
            `}
          />
          <CarouselSection title="Co wyróżnia nasz kurs?" />
          <ImageTextSection
            buttonAction={() => {}}
            buttonName={"DĄŁACZ DO KURSU"}
            imageLink="./roseIcons/boyIllustration.svg"
            title={"Dla kogo jest ten kursu ?"}
            text={`Dla wszystkich osób, które stawiają pierwsze kroki na rynku pracy, w tym studenci, absolwenci i maturzyści, którzy szukają swojej zawodowej drogi.

                  Osoby, które po urlopie macierzyńskim czy zdrowotnym ponownie wkraczają na rynek pracy.

                  Osoby, które nie miały okazji zdobyć 
                  dotychczas doświadczenia zawodowego.

Jeśli jesteś osobą ambitną, pragnącą rozwoju i zdobycia nowej wiedzy - połącz się z nami!`}
          />
          <ImageTextSection
            buttonAction={() => {}}
            buttonName={"DĄŁACZ DO KURSU"}
            reverse={true}
            imageLink="./roseIcons/girlIllustration.svg"
            title={"PO UKOŃCZENIU kursu ?"}
            text={`Przygotowanie merytoryczne do rozpoczęcia poszukiwań swojej wymarzonej pracy

Pewność siebie jesteś przygotowany, 
więc nie musisz się bać.

Świadomość swojej wartości na rynku pracy
jesteś przyszłością.

Poznanie odpowiedzi na wiele nurtujących Was pytań m.in. „Dlaczego nikt nie dzwoni w odpowiedzi na moje CV?” `}
          />
          <div
            className="home-course-title"
            data-aos={"fade-down"}
            data-aos-duration="1500"
            data-aos-delay="150"
          >
            <p className=" blueSecondaryHeader">Zapraszamy na Kurs!</p>
            <CustomCountDown />
            <ProgressBar className={"home-progressBar"} progress={80} />
          </div>
          <div className="home-course-types">
            <CustomCarousel settings={{ slidesToShow: 2 }}>
              {courses.map((course) => {
                return (
                  <CourseCard
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
            <p className="home-course-title blueSecondaryHeader">
              Opinie O Kursie
            </p>
            <CustomCarousel
              settings={{
                slidesToShow: 3,
                responsive: [
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 2,
                      initialSlide: 2,
                    },
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 2,
                      initialSlide: 2,
                    },
                  },
                  {
                    breakpoint: 481,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      rows: 1,
                    },
                  },
                ],
              }}
            >
              {opinions.map((opinion) => {
                return (
                  <OpinionCard
                    avatarLink={opinion.avatarLink}
                    opinion={opinion.opinion}
                  />
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
