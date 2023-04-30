import Button, { ButtonTypes } from '../common/Button';
import './imageTextSection.scss';

interface IImagetextSectionProps {
    title: string;
    imageLink: string;
    text:string;
    subTitile?: string;
    reverse?:boolean;
    buttonName?:  string;
    buttonAction?: (props?:any) => void;
}

const ImageTextSection = (props:IImagetextSectionProps) => {
    const { title, imageLink, subTitile, text, reverse, buttonName, buttonAction } = props;
    return (
        <div className='imagetextSection'>
            <div className='blueSecondaryHeader imagetextSection-header' data-aos={'fade-down'}  data-aos-duration="1500" data-aos-delay="150">{title}</div>
            <div className={`imagetextSection-wrapper ${ reverse ? 'imagetextSection-reverseWrapper' : '' }`}>
                <div className='imagetextSection-wrapper-text' style={{ whiteSpace: "pre-line" }}>
                    <div className='blackSecondaryHeader'>{subTitile}</div>
                    <p className='blackMainText' data-aos={!reverse ? 'fade-right' : 'fade-left'} data-aos-duration="1500"  data-aos-delay="150">
                        {text}
                    </p>
                    <div className='imagetextSection-button' data-aos={'fade-up'}  data-aos-duration="1500" data-aos-delay="150">
                       { buttonName && buttonAction && <Button type={ButtonTypes.default} handleClick={()=> {buttonAction?.()}} >{buttonName}</Button>}
                    </div>
                </div>
            <div className='imagetextSection-wrapper-image' data-aos={reverse ? 'fade-right' : 'fade-left'}  data-aos-duration="1500" data-aos-delay="150">
                    <img src={imageLink}/>
                </div>
            </div>
        </div>
    );
}

export default ImageTextSection;