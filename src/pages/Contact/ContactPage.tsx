import '../Home/home.scss';
import ContactForm from "../../components/contactForm/Contactform"
import { useEffect } from 'react';
import NavBar from '../../components/header/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import ReactGA from 'react-ga4';

const ContactPage = () => {
    
    useEffect(() => {
        ReactGA.send({
          hitType: 'pageview',
          page: window.location.pathname,
          title: 'contact us',
        })
    }, [])

    return (
          <div>
          <NavBar/>
           <div className="home-contact">
            
            <p
              className="home-course-title blueSecondaryHeader"
            >
              Kontakt
            </p>
            <div className="home-contact-wrapper" id="contact">
              <div
                className="home-contact-info"
              >
                <p className="blueSmallText">
                  Bądź najlepszą wersją siebie na rozmowie o pracę!
                </p>
                <img src={"./roseIcons/illustrationContact.svg"}></img>
              </div>
              <div
                className="home-contact-form">
                <ContactForm />
              </div>
            </div>
          </div>
          <Footer/>
          </div>
    )
}

export default ContactPage