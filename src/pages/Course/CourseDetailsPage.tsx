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
import Loader from "../../components/loader/Loader";
import { Author } from "../../utils/models/Author";
import AuthorApi from "../../utils/apis/AuthorApi";
import Accordion from "../../components/accordion/Accordion";
import AuthorSection from "../../components/authorSection/authorSection";

const CourseDetailsPage = () => {

    const params =  useParams();
    const dispatch = useDispatch();
    const [ course, setCourse ] = useState<Course>();
    const [ selectedDate, setSelectedDate ] = useState();
    const [ availableDates, setAvailableDates ] = useState<Array<any>>([]);
    const [courses, setCourses] = useState<Array<Course>>([]);
    const [ author, setAuthor ] = useState<Author>();
    
    const chooseDate = (date:any) => {
        setSelectedDate(date)
    }

    const addToCart = (course:Course) => {
        if (selectedDate) {
            dispatch(cartActions.addToCart({ course, date: selectedDate, quantity: 1}));
        }
        
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
                    label: moment(date.date?.toString()).format('MMMM Do YYYY, HH:mm:ss'),
                    value: date.id
                }
            })

            setAvailableDates(tmp);
        })
    }, [])



    return(
        <div className="details-body">
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
                                    { course?.redeemedPrice ? (<div><p>{course?.redeemedPrice} zł</p> <p style={{ textDecoration: 'line-through' }}>{ course.price } zł</p>  </div>) : <p>{course?.price} zł</p> }
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
                            <p className="details-wrapper-description-body blackMainText">
                                { course?.shortDescription }
                            </p>
                            <img src={course?.image}></img>   
                        </div>
                    </div>
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
                        <Accordion slides={[ {
                                title: author?.name + ' ' +  author?.surname,
                                text: author?.description,
                                image: author?.image
                        } ]}/>
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