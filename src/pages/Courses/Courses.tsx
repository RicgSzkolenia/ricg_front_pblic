import { useEffect, useState } from "react"
import { Course } from "../../utils/models/Course";
import CourseApi from "../../utils/apis/CourseApi";
import CourseCard from "../../components/courseCard/CourseCard";
import NavBar from "../../components/header/navBar/NavBar";
import styled from "styled-components";

const StyledCoursePage = styled.div`
    max-width: 1440px;
    width: 98%;
    margin: 0 auto;

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
    justify-content: flex-start;
    align-items: center;
    .courseCard {
        transform: scale(0.8);
        margin: 10px;
    }
`

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
                { courses.map((course, index) => {
                    return (
                        <CourseCard key={index} id={course.id || ""} title={course.title} type={course.type} points={course.points} price={course.price} link={course.link}  />
                    )
                }) }
            </CourseWrapper>
         
        </StyledCoursePage>
    )
}

export default CoursesPage