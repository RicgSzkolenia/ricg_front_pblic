import './courseCard.scss';
import { Course } from '../../utils/models/Course';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import cartActions from '../../store/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

interface ICourseCardProps {
   course: Course;
   key: number;
}

const CourseCard = (props:ICourseCardProps) => {
    const { course, key } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ availableDates, setAvailableDates ] = useState<Array<any>>([]);
    const [ selectedCardDate, setSelectedCardDate ] = useState();

    useEffect(() => {
        const tmp = course.courseDates.map((date) => {
            return {
                label: moment(date.date?.toString()).format('MMMM Do YYYY, HH:mm:ss'),
                value: date.id
            }
        })

        setAvailableDates(tmp)
    }, [])

    const addToCart = (course:Course) => {
        if (selectedCardDate) {
            dispatch(cartActions.addToCart({ course, date: selectedCardDate}));
        }
        
    }

    const chooseDate = (date:any) => {
        setSelectedCardDate(date)
    }

    return (
        <div key={key} className="courseCard" >
            <img onClick={() => {
            navigate(`/product/${course.id}`)
        }} src={course.image}></img>
            <div className='courseCard-header' onClick={() => {
            navigate(`/product/${course.id}`)
        }}>
                <p>{ course.category }</p>
                <p>{ course.isOnline ? 'Online' : 'Offline'  }</p>
            </div>
            <div className='courseCard-body' onClick={() => {
            navigate(`/product/${course.id}`)
        }}>
                <p>{ course.title }</p>
                <div className='courseCard-separator'></div>
                <span>{ course.shortDescription }</span>
            </div>
            <div className='courseCard-dates'>
                <p>Terminy:</p>
                <div>
                    <Dropdown value={selectedCardDate} onChange={chooseDate} className='courseCard-dates-dropdown'  placeholder="Wybierz termin" options={availableDates}/>
                </div>
            </div>
            <div className='courseCard-footer'>
                { course.redeemedPrice ? (<div><p>{course.redeemedPrice} zł</p> <p style={{ textDecoration: 'line-through' }}>{ course.price } zł</p>  </div>) : <p>{course.price} zł</p> }
                <div className={`courseCard-footer-button ${ selectedCardDate ? 'button-active' : 'button-disabled' }`} onClick={() => {addToCart(course)}}>
                    Dodaj do koszyku
                </div>
            </div>
        </div>
    )
}

export default CourseCard;