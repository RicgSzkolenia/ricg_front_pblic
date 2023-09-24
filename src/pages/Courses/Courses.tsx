import { useEffect, useState } from "react"
import { Course } from "../../utils/models/Course";
import CourseApi from "../../utils/apis/CourseApi";
import CourseCard from "../../components/courseCard/CourseCard";
import NavBar from "../../components/header/navBar/NavBar";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import ReactGA from 'react-ga4';

const StyledCoursePage = styled.div`
    width: 100%;
    margin: 0 auto;
    min-height: 80vh;
    padding-top: 90px;

    .courses-header {
        margin: 0 auto;
        padding-left: 25px;
        max-width: 1280px;
        font-size: 45px;
        color: #E3746D;

    }
`;

const CourseWrapper = styled.div`
    margin: 0 auto;
    max-width: 1250px;
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // justify-content: space-evenly;
    // align-items: center;

    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;

    @media only screen and (max-width: 768px) {
        grid-template-columns: auto;
    }

    @media only screen and (min-width: 769px) and (max-width: 1150px) {
        grid-template-columns: auto auto;
    }

    min-height: 90vh;
    .courseCard {
        margin: 10px;

        @media screen and (max-resolution:  124dpi)  {
            transform: scale(0.75);
        }
    }
`;


const CoursesPage = () => {
    const [ courses, setCourses ] = useState<Array<Course>>([]);


    useEffect(() => {

        CourseApi.getAllCourses().then((courses) => {
            setCourses(courses);
        })

        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname,
            title: 'Courses'
        })

    }, [])

    return(
        <div>
        <NavBar/>
        <StyledCoursePage>
      
            <p className="carouselSection-title blueSecondaryHeader section-header-top-bottom-margin">Dostępne Webinary</p>
            <CourseWrapper>
                { courses.length === 0 ?
                (<Loader/>) : '' }
                { courses.map((course, index) => {
                    return (
                        <CourseCard key={index}  course={course} />
                    )
                }) }
            </CourseWrapper>
            <Footer></Footer>
        </StyledCoursePage>
        </div>
    )
}

export default CoursesPage