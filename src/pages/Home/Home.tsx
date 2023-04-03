import React from 'react';
import AimSection from '../../components/aimSection/AimSection';
import CarouselSection from '../../components/carouselSection/CarouselSection';
import ContactForm from '../../components/Contactform';
import Header from '../../components/header/Header';
import ImageTextSection from '../../components/imageTextSection/ImageTextSection';

const Home =  () => {

    return (
        <div>
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
                <CarouselSection title='Co wyróżnia nasz kurs?'/>
        </div>
    )
}

export default Home;