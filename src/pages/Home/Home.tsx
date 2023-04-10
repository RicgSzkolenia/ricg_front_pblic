import React from 'react';
import './home.scss'
import AimSection from '../../components/aimSection/AimSection';
import CarouselSection from '../../components/carouselSection/CarouselSection';
import ContactForm from '../../components/contactForm/Contactform';
import Header from '../../components/header/Header';
import ImageTextSection from '../../components/imageTextSection/ImageTextSection';
import Countdown from 'react-countdown';
import CustomCountDown from '../../components/countdown/CustomCountDown';
import ProgressBar from '../../components/common/ProgressBar';
import CustomCarousel from '../../components/customCarousel/CustomCarousel';
import { courses, opinions, slides } from '../../components/carouselSection/slides';
import Card from '../../components/common/Card';
import Button, { ButtonTypes } from '../../components/common/Button';
import CourseCard from '../../components/courseCard/CourseCard';
import OpinionCard from '../../components/opinionCard/OpinionCard';
import Footer from '../../components/footer/Footer';

const Home =  () => {

    return (
        <div className='home'>
            <Header/>
            <AimSection/>
            <ImageTextSection imageLink='./MasterFoto.png' title={'Dlaczego warto się z nami spotkać?'} subTitile={'Paulina Laczek'} text={`Prezes Zarządu RICG. Ma ponad 20-letnie doświadczenie 
                w branży HR.
                Prowadzi projekty doradztwa personalnego, procesy rekrutacyjne dla
                międzynarodowych korporacji
                i największych polskich spółek. Jako
                doradca, mentor i headhunter inspiruje zarządy korporacji do
                wdrażania zmian, a menedżerów do rozwoju. Przeprowadziła z
                sukcesem kilkaset projektów executive search. Nie ma dla nich zadań
                niemożliwych do realizacji. Regularnie komentuje w mediach tematy
                związane z rynkiem pracy. Absolwentka MBA HR na Akademii Leona Koźmińskiego. `}/>
                <CarouselSection title='Co wyróżnia nasz kurs?'/>
                <ImageTextSection buttonAction={() => {}} buttonName={'DĄŁACZ DO KURSU'}  imageLink='./Illustration2.svg' title={'Dla kogo jest ten kursu ?'} text={`Prezes Zarządu RICG. Ma ponad 20-letnie doświadczenie 
                w branży HR.
                Prowadzi projekty doradztwa personalnego, procesy rekrutacyjne dla
                międzynarodowych korporacji
                i największych polskich spółek. Jako
                doradca, mentor i headhunter inspiruje zarządy korporacji do
                wdrażania zmian, a menedżerów do rozwoju. Przeprowadziła z
                sukcesem kilkaset projektów executive search. Nie ma dla nich zadań
                niemożliwych do realizacji. Regularnie komentuje w mediach tematy
                związane z rynkiem pracy. Absolwentka MBA HR na Akademii Leona Koźmińskiego. `}/>
                  <ImageTextSection buttonAction={() => {}} buttonName={'DĄŁACZ DO KURSU'}  reverse={true} imageLink='./Frame.svg' title={'PO UKOŃCZENIU kursu ?'}  text={`Prezes Zarządu RICG. Ma ponad 20-letnie doświadczenie 
                w branży HR.
                Prowadzi projekty doradztwa personalnego, procesy rekrutacyjne dla
                międzynarodowych korporacji
                i największych polskich spółek. Jako
                doradca, mentor i headhunter inspiruje zarządy korporacji do
                wdrażania zmian, a menedżerów do rozwoju. Przeprowadziła z
                sukcesem kilkaset projektów executive search. Nie ma dla nich zadań
                niemożliwych do realizacji. Regularnie komentuje w mediach tematy
                związane z rynkiem pracy. Absolwentka MBA HR na Akademii Leona Koźmińskiego. `}/>
                <div className='home-course-title'>
                  <p className=' blueSecondaryHeader'>Zapraszamy na Kurs!</p>
                  <CustomCountDown/>
                  <ProgressBar className={'home-progressBar'} progress={80} />
                </div>
                <div className='home-course-types'>
                  <CustomCarousel settings={{slidesToShow: 2}}>
                    { courses.map((course) => {
                      return(
                        <CourseCard title={course.title} type={course.type} points={course.points} price={course.price} link={course.link}/>
                      )
                    })}
                  </CustomCarousel>
                </div>
                <div className='home-reviews'>
                  <p className='home-course-title blueSecondaryHeader'>Opinie O Kursie</p>
                  <CustomCarousel settings={{ slidesToShow: 3 }} >
                    { opinions.map((opinion) => {
                      return(
                        <OpinionCard avatarLink={opinion.avatarLink} opinion={opinion.opinion} />
                      )
                    })}
                  </CustomCarousel>
                </div>
                <div className='home-contact'>
                    <p className='home-course-title blueSecondaryHeader'>Kontakt</p>
                    <div className='home-contact-wrapper'>
                      <div className='home-contact-info'>
                        <p className='blueSmallText'>Bądź najlepszą wersją siebie
                            na rozmowie o pracę!</p>
                        <img src={'./Illustration.png'}></img>
                      </div>
                      <div className='home-contact-form'>
                        <ContactForm/>
                      </div>
                    </div>
                </div>
                <Footer/>

        </div>
    )
}

export default Home;