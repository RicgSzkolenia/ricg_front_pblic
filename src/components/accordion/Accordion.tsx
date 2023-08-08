import { useState } from 'react';
import parse from 'html-react-parser';
import './accrodion.scss'

export interface Slide {
    title: string,
    text: string,
    image: string, 

}

const Accordion = (props:any) => {

    const [ activeSlideIndex, setActiveSlideIndex ] = useState<number>(0);

    const handleClick = (index:number) => {
        setActiveSlideIndex(index)
    }

    return (
        <div className='accordion'>
            { props.slides?.map((slide:Slide, index:number) => {
                return (
                    <div className={`accordion-section ${ activeSlideIndex === index ? 'active' : '' }`} onClick={() => {
                        handleClick(index)
                    }}>
                        <div className="accordion-section-title">
                            <p>{ slide.title }</p>
                        </div>
                        <div className="accordion-section-content">
                          <div className="accordion-section-content-text">{  parse(slide.text || '') }</div>
                          <div className="accordion-section-content-image"> <img src={ slide.image }></img>  </div>
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

export default Accordion;