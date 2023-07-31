import { useNavigate } from 'react-router-dom';
import { createPayment } from '../../utils/hooks/usePayment';
import Button, { ButtonTypes } from '../common/Button';
import './courseCard.scss';
interface ICourseCardProps {
    id: string;
    title: string;
    type: string;
    points: Array<string>
    price: number;
    link: string;
    key?: any
}

const CourseCard = (props:ICourseCardProps) => {
    const { id, title, type, points, price, link, key } = props;
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/product/${id}`);
        // createPayment(id, title, price)
    }

    return (
        <div key={key} className="courseCard">
            <div className='courseCard-title'>{title}</div>
            <div className='courseCard-type'>{type}</div>
            <div className='courseCard-pointWrapper'> { points.map((point, index:number) => {
                return (
                    <div className='courseCard-point' key={index}>
                        <img src="./star.png"></img> { point }
                    </div>
                )
            }) } </div>
            <div className='courseCard-price'>
                { price } zł
            </div>
            <Button className='courseCard-button' type={ButtonTypes.default} handleClick={handleClick} >Kup</Button>
        </div>
    )
}

export default CourseCard;