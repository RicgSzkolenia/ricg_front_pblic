import { useEffect, useState } from "react";
import AuthorApi from "../../utils/apis/AuthorApi";
import { Author } from "../../utils/models/Author";
import Accordion, { Slide } from "../accordion/Accordion";
import CustomCarousel from "../customCarousel/CustomCarousel";
import AuthorCard from "../authorCard/AuthorCard";
import './authorSection.scss';


const AuthorSection = () => {

    const [slides, setSlides] = useState<Array<Slide>>([]);
    const [ authors, setAuthors ] = useState<Array<Author>>([])


    useEffect(() => {
        AuthorApi.getAllAuthors().then((authors:Array<Author>) => {
            setAuthors(authors);
            const slides:Array<Slide> = authors.map((author) => {
                return {
                    title: author.name + ' ' +  author.surname,
                    text: author.description,
                    image: author.image
    
                }
            })

            setSlides(slides)
        });
    }, [])

    return (
        <div className=" authorSection standart-center-section section-top-bottom-margin ">
            <div className='blueSecondaryHeader imagetextSection-header section-header-top-bottom-margin'>Nasz Zespół</div>
            {/* <Accordion slides={slides}/> */}
            <div className="authorSection-wrapper">
            { authors.map((author) => {
                    return(
                        <AuthorCard author={author} />
                    )
                }) }
            </div>
            {/* <CustomCarousel> */}
              
            {/* </CustomCarousel> */}
        </div>
    )
}

export default AuthorSection;