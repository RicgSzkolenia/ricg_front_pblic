import { useEffect, useState } from "react";
import CourseApi from "../../utils/apis/CourseApi";
import { Course } from "../../utils/models/Course";
import { useParams } from "react-router-dom";
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

const CourseDetailsPage = () => {

    const params =  useParams();
    const dispatch = useDispatch();
    const [ course, setCourse ] = useState<Course>();
    const [ selectedDate, setSelectedDate ] = useState();
    const [ availableDates, setAvailableDates ] = useState<Array<any>>([]);
    const [courses, setCourses] = useState<Array<Course>>([]);
    
    const chooseDate = (date:any) => {
        setSelectedDate(date)
    }

    const addToCart = (course:Course) => {
        if (selectedDate) {
            dispatch(cartActions.addToCart({ course, date: selectedDate}));
        }
        
    }

    useEffect(() => {
        CourseApi.getAllCourses().then((courses) => {
            setCourses(courses)
        })
        
        CourseApi.getCourseById(params.id || '1').then((course:Course) => {
            setCourse(course);
            const tmp = course.courseDates.map((date) => {
                return {
                    label: moment(date.date?.toString()).format('MMMM Do YYYY, HH:mm:ss'),
                    value: date.id
                }
            })

            setAvailableDates(tmp);
            console.log(course.points);
        })
    }, [])



    return(
        <div>
            <NavBar/>
            <div className="details-wrapper">
                <div className="details-wrapper-header">
                    <img src={course?.image}></img>
                    <div className="details-wrapper-header-sum">
                        <div className="details-wrapper-header-sum-header">
                            <p>{course?.category}</p>
                            <p>{ course?.isOnline ? 'Online' : 'Offline'  }</p>
                        </div>
                        <div className="details-wrapper-header-sum-body">
                            <p>{course?.title}</p>
                            <div className='details-wrapper-header-sum-body-dates'>
                                <p>Terminy:</p>
                                <div>
                                    <Dropdown value={selectedDate} onChange={chooseDate} className='courseCard-dates-dropdown'  placeholder="Wybierz termin" options={availableDates}/>
                                </div>
                            </div>
                            <div className='details-wrapper-header-sum-body-footer'>
                                { course?.redeemedPrice ? (<div><p>{course?.redeemedPrice} zł</p> <p style={{ textDecoration: 'line-through' }}>{ course.price } zł</p>  </div>) : <p>{course?.price} zł</p> }
                                <div className={`courseCard-footer-button ${ selectedDate ? 'button-active' : 'button-disabled' }`} onClick={() => {addToCart(course!)}}>
                                    Dodaj do koszyku
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="details-wrapper-description">
                    <p className="details-wrapper-description-header">Opis</p>
                    <p className="details-wrapper-description-body">
                        { course?.shortDescription }
                    </p>
                </div>
                <div className="details-wrapper-points">
                    <p className="details-wrapper-description-header">czego się nauczysz na grupowym?</p>
                    <div className="details-wrapper-points-wrapper">
                        { course?.points.map((point:any, index:number) => {
                            const { label, value } = point;
                            return (
                                <div className="details-wrapper-points-wrapper-item" key={index}>
                                    <p className="details-wrapper-points-wrapper-item-iterator">{index + 1}</p>
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
                <div className="home-course-types">
                    <p className="details-wrapper-description-header">Inne kursy</p>
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
            <Footer/>
        </div>
    )
}

export default CourseDetailsPage;