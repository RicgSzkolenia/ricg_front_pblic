import './courseCard.scss';
import { Course } from '../../utils/models/Course';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface ICourseCardProps {
   course: Course;
   key: number;
}

const CourseCard = (props:ICourseCardProps) => {
    const { course, key } = props;

    const navigate = useNavigate();

    return (
        <div key={key} className="courseCard" onClick={() => {
            navigate(`/products/${course.id}`)
        }}>
            <img src={course.image}></img>
            <div className='courseCard-header'>
                <p>{ course.category }</p>
                <p>{ course.isOnline ? 'Online' : 'Offline'  }</p>
            </div>
            <div className='courseCard-body'>
                <p>{ course.title }</p>
                <div className='courseCard-separator'></div>
                <span>{ course.shortDescription }</span>
            </div>
            <div className='courseCard-dates'>
                <p>Terminy:</p>
                <div>
                    <Dropdown className='courseCard-dates-dropdown'  placeholder="Wybierz termin" options={[ ...course.courseDates.map((date) => {
                        console.log(date);
                        return {
                            label: moment(date.date?.toString()).format('MMMM Do YYYY, HH:mm:ss'),
                            value: date.id
                        }
                    })]}/>
                </div>
            </div>
            <div className='courseCard-footer'>
                { course.redeemedPrice ? (<div><p>{course.redeemedPrice} zł</p> <p style={{ textDecoration: 'line-through' }}>{ course.price } zł</p>  </div>) : <p>{course.price} zł</p> }
                <div className='courseCard-footer-button'>
                    Dodaj do koszyku
                </div>
            </div>
        </div>
    )
}

export default CourseCard;