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
            <div className='blueSecondaryHeader imagetextSection-header'>{title}</div>
            <div className={`imagetextSection-wrapper ${ reverse ? 'imagetextSection-reverseWrapper' : '' }`}>
                <div className='imagetextSection-wrapper-text' style={{ whiteSpace: "pre-line" }}>
                    <div className='blackSecondaryHeader'>{subTitile}</div>
                    <p className='blackMainText'>
                        {text}
                    </p>
                    <div className='imagetextSection-button'>
                       { buttonName && buttonAction && <Button width='350px' type={ButtonTypes.default} handleClick={()=> {buttonAction?.()}} >{buttonName}</Button>}
                    </div>
                </div>
                <div className='imagetextSection-wrapper-image'>
                    <img src={imageLink}/>
                </div>
            </div>
        </div>
    );
}

export default ImageTextSection;