import './courseCard.scss';
import { Course } from '../../utils/models/Course';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import 'moment/locale/pl' 
import { useNavigate } from 'react-router-dom';
import cartActions from '../../store/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import { trackGoogleAnalyticsEvent } from '../../utils/hooks/useAnalytics';

interface ICourseCardProps {
   course: Course;
   key: number;
   isOuterModal?:boolean;
   onModalOpen?:(course:Course) => void
}

const CourseCard = (props:ICourseCardProps) => {
    const { course, key, isOuterModal, onModalOpen } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ availableDates, setAvailableDates ] = useState<Array<any>>([]);
    const [ selectedCardDate, setSelectedCardDate ] = useState<any>();
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    useEffect(() => {
        const tmp = course.courseDates.map((date) => {
            return {
                label: moment(date.date?.toString()).locale('pl').format('MMMM Do YYYY, HH:mm:ss'),
                value: date.id
            }
        })

        setAvailableDates(tmp)
    }, [])
  
    useEffect(() => {
        setSelectedCardDate(availableDates?.[0])
    }, [availableDates])

    const addToCart = (course:Course) => {
        if (selectedCardDate) {
            trackGoogleAnalyticsEvent('add_to_cart', 'add_to_cart', window.location.pathname + window.location.search,  { ...course })
            if (!isOuterModal) {
                setIsModalOpen(true);
            } else {
                onModalOpen?.(course)
            }
            dispatch(cartActions.addToCart({ course, date: selectedCardDate, quantity: 1}));
           
        }
      
        
    }

    const chooseDate = (date:any) => {
        setSelectedCardDate(date)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const goToCart = () => {
        navigate('/cart')
    }

    return (
        
        <div key={key} className="courseCard" >
             { !isOuterModal && isModalOpen && <Modal close={handleModalClose}>
              <div className='cart-modal'>
                    <p className="cart-modal-header">Dodano do koszyka!</p>
                    <p className="cart-modal-body">
                      Dodales do koszyka webinar: { course.title }
                    </p>
                    <div className="cart-modal-actions">
                    <div className="cart-modal-actions-buttons" >
                        <div onClick={goToCart} className="cart-modal-actions-button">
                                Przejdź do koszyka
                            </div>
                            <div onClick={handleModalClose} className="cart-modal-actions-button">
                                Kontynuj Zakupy
                            </div>
                        </div>
                    </div>
              </div>
            </Modal> }

            <img onClick={() => {
            navigate(`/product/${course.id}`)
        }} src={course.image}></img>
            <div className='courseCard-header' onClick={() => {
            navigate(`/product/${course.id}`)
        }}>
                <p>{ course.category }</p>
                {/* <p>{ course.isOnline ? 'Online' : 'Offline'  }</p> */}
            </div>
            <div className='courseCard-body' onClick={() => {
            navigate(`/product/${course.id}`)
        }}>
                <p>{ course.title }</p>
                <div className='courseCard-separator'></div>
                <div>
                    { course.cardPoints.map((point:any) => {
                        return(
                            <div className='courseCard-body-item' key={point.value}>
                                <div className='courseCard-body-item-round'></div>
                                <span className='courseCard-body-item-text'>{point.label}</span>
                            </div>
                        )
                    }) }
                </div>
            </div>
            <div className='courseCard-dates'>
                <div>
                    <Dropdown value={selectedCardDate} onChange={chooseDate} className='courseCard-dates-dropdown'  placeholder="Wybierz termin" options={availableDates}/>
                </div>
            </div>
            <div className='courseCard-footer'>
                { course.redeemedPrice ? (<div><p>{course.redeemedPrice} zł</p> <p style={{ textDecoration: 'line-through', fontSize: '16px' }}>{ course.price } zł</p>  </div>) : <p>{course.price} zł</p> }
                <div className={`courseCard-footer-button ${ selectedCardDate ? 'button-active' : 'button-disabled' }`} onClick={() => {
                    addToCart(course)
                    }}>
                    Dodaj do koszyka
                </div>
            </div>
        </div>
    )
}

export default CourseCard;