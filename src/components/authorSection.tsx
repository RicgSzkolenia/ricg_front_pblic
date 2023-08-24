import { useEffect, useState } from "react";
import AuthorApi from "../utils/apis/AuthorApi";
import { Author } from "../utils/models/Author";
import Accordion, { Slide } from "./accordion/Accordion";


const AuthorSection = () => {

    const [slides, setSlides] = useState<Array<Slide>>([]);


    useEffect(() => {
        AuthorApi.getAllAuthors().then((authors:Array<Author>) => {
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
        <div>
            <div className='blueSecondaryHeader imagetextSection-header' data-aos={'fade-down'}  data-aos-duration="1500" data-aos-delay="150">Nasz Zespół</div>
            <Accordion slides={slides}/>
        </div>
    )
}

export default AuthorSection;