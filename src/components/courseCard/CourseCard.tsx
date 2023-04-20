import Button, { ButtonTypes } from '../common/Button';
import './courseCard.scss';
interface ICourseCardProps {
    title: string;
    type: string;
    points: Array<string>
    price: number;
    link: string;
}

const CourseCard = (props:ICourseCardProps) => {
    const { title, type, points, price, link } = props;

    const handleClick = () => {

    }

    return (
        <div className="courseCard">
            <div className='courseCard-title'>{title}</div>
            <div className='courseCard-type'>{type}</div>
            <div> { points.map((point, index:number) => {
                return (
                    <div className='courseCard-point' key={index}>
                        { point }
                    </div>
                )
            }) } </div>
            <div className='courseCard-price'>
                { price } zł
            </div>
            <Button className='courseCard-button' width='290px' height='20px' type={ButtonTypes.default} handleClick={handleClick} >Kup Kurs</Button>
        </div>
    )
}

export default CourseCard;