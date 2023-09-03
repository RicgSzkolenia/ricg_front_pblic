import { useEffect, useState } from "react"
import { Course } from "../../utils/models/Course";
import CourseApi from "../../utils/apis/CourseApi";
import CourseCard from "../../components/courseCard/CourseCard";
import NavBar from "../../components/header/navBar/NavBar";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";

const StyledCoursePage = styled.div`
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    min-height: 80vh;

    .courses-header {
        margin-left: 1%;
        font-size: 45px;
        color: #E3746D;

    }
`;

const CourseWrapper = styled.div`
   
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    min-height: 90vh;
    .courseCard {
        transform: scale(0.90);
        margin: 10px;
    }
`;


const CoursesPage = () => {
    const [ courses, setCourses ] = useState<Array<Course>>([]);


    useEffect(() => {
        CourseApi.getAllCourses().then((courses) => {
            setCourses(courses);
        })
    }, [])

    return(
        <StyledCoursePage>
            <NavBar/>
            <p className="courses-header">Dostepne kursy</p>
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
    )
}

export default CoursesPage