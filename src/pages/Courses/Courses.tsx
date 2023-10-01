import { useEffect, useState } from "react"
import { Course } from "../../utils/models/Course";
import CourseApi from "../../utils/apis/CourseApi";
import CourseCard from "../../components/courseCard/CourseCard";
import NavBar from "../../components/header/navBar/NavBar";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import ReactGA from 'react-ga4';
import Dropdown from 'react-dropdown';

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

    .courses-category {
        width: 300px;
        margin: 10px auto;
    }
`;

const CourseWrapper = styled.div`
    margin: 0 auto;
    max-width: 1250px;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;

    @media only screen and (max-width: 920px) {
        grid-template-columns: auto;
    }

    min-height: 90vh;
    .courseCard {
        margin: 10px;

       
    }
`;


const CoursesPage = () => {
    
    const [ courses, setCourses ] = useState<Array<Course>>([]);
    const [ filteredCourses, setFilteredCourses ] = useState<Array<Course>>([]);
    const [ categoties, setCategories ] = useState<Array<{ label: string, value: string }>>([]);
    const [ selectedCategory, setSelectedCategory ] = useState<any>();



    const handleSelectCategoryFiltering = (category: any) => {
        setSelectedCategory(category);
        const filteredCourses = courses.filter((course) => {
            if ( category.label === 'Wszystkie' ) 
                return true
            return course.category === category.label
        })
        setFilteredCourses(filteredCourses)
    }

    useEffect(() => {

        CourseApi.getAllCourses().then((courses) => {
            const categoryNames = [...new Set(courses.map((course) => course.category))].concat('Wszystkie');
            setCategories(categoryNames.map((name, index) => { return { label: name, value: index.toString() } }));
            setCourses(courses?.sort((a, b) => b.priority - a.priority));
            setFilteredCourses(courses?.sort((a, b) => b.priority - a.priority))
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
            <Dropdown value={selectedCategory} onChange={handleSelectCategoryFiltering} className='courses-category'  placeholder="Kategoria" options={categoties}/>
            <CourseWrapper>
                { courses.length === 0 ?
                (<Loader/>) : '' }
                { filteredCourses.map((course, index) => {
                    return (
                        <div key={index}>
                            <CourseCard key={index}  course={course} />
                        </div>
                        
                    )
                }) }
            </CourseWrapper>
            <Footer></Footer>
        </StyledCoursePage>
        </div>
    )
}

export default CoursesPage