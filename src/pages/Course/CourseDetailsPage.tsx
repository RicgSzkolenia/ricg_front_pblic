import { useEffect, useState } from "react";
import CourseApi from "../../utils/apis/CourseApi";
import { Course } from "../../utils/models/Course";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/header/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import './courseDetailsPage.scss'
import Dropdown from 'react-dropdown';
import { useDispatch } from "react-redux";
import cartActions from "../../store/actions/cartActions";
import moment from "moment";
import CustomCarousel from "../../components/customCarousel/CustomCarousel";
import customCarouselSettingsConstants from "../../components/customCarousel/customCarouselSettingsConstants";
import CourseCard from "../../components/courseCard/CourseCard";
import Loader from "../../components/loader/Loader";
import { Author } from "../../utils/models/Author";
import AuthorApi from "../../utils/apis/AuthorApi";
import ReactGA from 'react-ga4';
import AuthorCard from "../../components/authorCard/AuthorCard";
import { trackGoogleAnalyticsEvent } from '../../utils/hooks/useAnalytics';
import Modal from "../../components/modal/Modal";


const CourseDetailsPage = () => {

    const params =  useParams();
    const dispatch = useDispatch();
    const [ course, setCourse ] = useState<Course>();
    const [ selectedDate, setSelectedDate ] = useState<any>();
    const [ availableDates, setAvailableDates ] = useState<Array<any>>([]);
    const [courses, setCourses] = useState<Array<Course>>([]);
    const [ author, setAuthor ] = useState<Author>();
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    const navigate = useNavigate();

    const chooseDate = (date:any) => {
        setSelectedDate(date)
    }

    const addToCart = (course:Course) => {
        if (selectedDate) {
            trackGoogleAnalyticsEvent('add_to_cart', 'add_to_cart', window.location.pathname + window.location.search,  { ...course })
            setIsModalOpen(true);
            dispatch(cartActions.addToCart({ course, date: selectedDate, quantity: 1}));
           
        }
        
    }

    const goToCart = () => {
        navigate('/cart')
    }


    useEffect(() => {
        AuthorApi.getAllAuthors().then((authors:Array<Author>) => {
            const filteredAuthor = authors.filter((author:Author)=> {
                const courseIdArray = author?.courses?.map((course) => course.id)
                return courseIdArray?.includes(Number(params.id));
            })
            setAuthor(filteredAuthor[0])
        })

        CourseApi.getAllCourses().then((courses) => {
            setCourses(courses)
        })
        
        CourseApi.getCourseById(params.id || '1').then((course:Course) => {
            setCourse(course);
            const tmp = course.courseDates.map((date) => {

                return {
                    label: date.isDateIndividual ? 'Individualny Termin' : moment(date.date?.toString()).format('MMMM Do YYYY, HH:mm:ss'),
                    value: date.id
                }
                
            }).filter((date) => date)
            ReactGA.send({
                hitType: 'pageview',
                page: window.location.pathname,
                title: `Course details - ${course?.title}`
              })

            setAvailableDates(tmp);
        })

     
    }, [])

    useEffect(() => {

        if (selectedDate) {
            CourseApi.getCourseDateById(selectedDate.value).then((res:any) => {
                const partIds:Array<string> = res.attributes?.course_part_dates?.data?.map((part:any) => {
                    return part.id;
                })

                Promise.all(partIds.map((id) => {
                    return  CourseApi.getCoursePartDateById(id)
                })).then((res) => {
                    const fetchedCourseDates = res.map((res:any) => res?.data?.data);
                    const populatedParts = course?.parts.map((oldPart) => {
                        const newPart = fetchedCourseDates.find((part) => part.attributes.course_parts?.data?.[0]?.id === oldPart.id)
                        if (newPart?.attributes?.date ) {
                            return { ...oldPart, date: newPart?.attributes?.date }
                        } else {
                            return {...oldPart}
                        }
                     
                     })

                     if( course ) {
                        const populatedCourse = {...course, parts: populatedParts|| []}
                        setCourse(populatedCourse)
                     }
                    
                })
               
            })
        }
        
    }, [selectedDate])
    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return(
        <div className="details-body">
            { isModalOpen && <Modal close={handleModalClose}>
            <div className='cart-modal'>
                    <p className="cart-modal-header">Dodano do koszyka!</p>
                    <p className="cart-modal-body">
                      Dodales do koszyka webinar: { course?.title }
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
                </Modal>}
            <NavBar/>
            { !course ? <Loader/> : (
                <div className="details-wrapper">
                    <div className="details-wrapper-header">
                        <div className="details-wrapper-header-sum">
                            <div className="details-wrapper-header-sum-header">
                                <p>{course?.category}</p>
                            </div>
                            <div className="details-wrapper-header-sum-body blueSecondaryHeader">
                                <p>{course?.title}</p>
                                <div className='details-wrapper-header-sum-body-dates'>
                                    <p>Terminy:</p>
                                    <div>
                                        <Dropdown value={selectedDate} onChange={chooseDate} className='courseCard-dates-dropdown'  placeholder="Wybierz termin" options={availableDates}/>
                                    </div>
                                </div>
                                <div className='details-wrapper-header-sum-body-footer'>
                                { course.redeemedPrice ? (<div><p style={{ fontSize: 12 }}>{Math.ceil(course.redeemedPrice/ 1.23)} zł netto</p><p>{course.redeemedPrice} zł</p> <p style={{ textDecoration: 'line-through', fontSize: '16px' }}>{ course.price } zł</p>  </div>) : <p><p style={{ fontSize: 12 }}>{Math.ceil(course.price/ 1.23)} zł netto</p>{course.price} zł</p> }
                                    <div className={`courseCard-footer-button ${ selectedDate ? 'button-active' : 'button-disabled' }`} onClick={() => {addToCart(course!)}}>
                                        Dodaj do koszyka
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="details-wrapper-description">
                        <p className="details-wrapper-description-header blueSecondaryHeader">Opis</p>
                        <div className="details-wrapper-description-wrapper">
                            <img src={course?.image}></img>   
                            <p className="details-wrapper-description-body blackMainText">
                                { course?.shortDescription }
                            </p>
                        </div>
                    </div>
                    { course.parts.length > 0 && (
                        <div className="details-wrapper-parts">
                            <p className="details-wrapper-description-header blueSecondaryHeader">Harmonogram</p>
                            <div  className="details-wrapper-parts-wrapper">
                                { course.parts.map((part) => {
                                    const { header, description } = part.attributes;
                                    return (
                                        <div className="details-wrapper-parts-wrapper-item">
                                            <p className="details-wrapper-points-wrapper-item-header">{header}</p>
                                            <p className="blackMainText">
                                               { part?.date && <b> { moment(part?.date).format('DD-MM-yyyy HH:mm') }</b>}
                                            </p>
                                            <p className="blackMainText">
                                                { description }
                                            </p>
                                        </div>
                                    ) 
                                    }) }
                            </div>
                        </div>
                    ) }
                    <div className="details-wrapper-points">
                        <p className="details-wrapper-description-header blueSecondaryHeader section-header-top-bottom-margin">czego się nauczysz na webinarze?</p>
                        <div className="details-wrapper-points-wrapper">
                            { course?.points.map((point:any, index:number) => {
                                const { label, value } = point;
                                return (
                                    <div className="details-wrapper-points-wrapper-item" key={index}>
                                        {/* <p className="details-wrapper-points-wrapper-item-iterator">{index + 1}</p> */}
                                        <div className="details-wrapper-points-wrapper-item-header">
                                            {label}
                                        </div>
                                        <div className="details-wrapper-points-wrapper-item-body">
                                            {value}
                                        </div>
                                    </div>
                                )
                            }) }
                        </div>
                    </div>
                    <div className="standart-center-section">
                        <p className="details-wrapper-description-header blueSecondaryHeader section-header-top-bottom-margin">Autor</p>
                        <AuthorCard author={author} />
                    </div>
                    
                    <div className="home-course-types">
                        <p className="details-wrapper-description-header blueSecondaryHeader section-header-top-bottom-margin">Inne Webinary</p>
                        <CustomCarousel settings={customCarouselSettingsConstants.customCourseCarouselSettings}>
                        {courses.map((course, index) => {
                            return (
                            <CourseCard
                                key={index}
                                course={course}
                            />
                            );
                        })}
                        </CustomCarousel>
                    </div>
                </div>
            ) }
            { course? <Footer/> : '' }
        </div>
    )
}

export default CourseDetailsPage;