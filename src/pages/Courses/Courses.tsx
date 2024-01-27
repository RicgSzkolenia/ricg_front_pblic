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
import ReactPaginate from 'react-paginate';

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

    .pagination {

        margin: 15px auto;
        display: flex;
        list-style: none;
        outline: none;
        

        li {
            height: 30px;
            width: 30px;
            border-radius: 15px;
            margin: 5px;
            text-align: center;
            line-height: 30px;
        }

        .selected {
            background-color: rgb(156, 91, 137);
            color: #fff;
        }
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

const PaginationWrapper = styled.div`
    width: 100%;
    display: flex; 
    justify-content: center; 
    align-items: center;
`


const CoursesPage = () => {
    
    const [ courses, setCourses ] = useState<Array<Course>>([]);
    const [ filteredCourses, setFilteredCourses ] = useState<Array<Course>>([]);
    const [ categoties, setCategories ] = useState<Array<{ label: string, value: string }>>([]);
    const [ selectedCategory, setSelectedCategory ] = useState<any>();
    const [ currentPageCourses, setCurrentPageCourses] = useState<Array<Course>>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(0);
    const [ numberOfPages, setNumberOfPages ] = useState<number>(0);
    const [ numberOfItemsPerPage ] = useState<number>(50)
    

    const handleSelectCategoryFiltering = (category: any) => {
        setSelectedCategory(category);
        const filteredCourses = courses.filter((course) => {
            if ( category.label === 'Wszystkie' ) 
                return true
            return course.category === category.label
        })
        setFilteredCourses(filteredCourses)
    }

    const handlePageSelection = (params:any) => {
        setCurrentPage(params.selected);
        setCurrentPageCourses(courses.slice(params.selected * numberOfItemsPerPage, (params.selected * numberOfItemsPerPage) + numberOfItemsPerPage ))
    }

    useEffect(() => {

        CourseApi.getAllCourses().then((courses) => {
            const categoryNames = [...new Set(courses.map((course) => course.category))].concat('Wszystkie');
            setCategories(categoryNames.map((name, index) => { return { label: name, value: index.toString() } }));
            setCourses(courses?.sort((a, b) => b.priority - a.priority));
            setFilteredCourses(courses?.sort((a, b) => b.priority - a.priority))

            const tmpNumberOfPages = courses.length / numberOfItemsPerPage;
            setNumberOfPages(tmpNumberOfPages)
            setCurrentPageCourses(courses.slice(0, numberOfItemsPerPage));
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
                { ( (selectedCategory?.label === 'Wszystkie' || !selectedCategory) ? currentPageCourses : filteredCourses).map((course, index) => {
                    return (
                        <div key={index}>
                            <CourseCard key={index}  course={course} />
                        </div>
                        
                    )
                }) }
            </CourseWrapper>
            {(selectedCategory?.label === 'Wszystkie' || !selectedCategory) && numberOfPages > 1 &&<PaginationWrapper>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageSelection}
                    pageRangeDisplayed={5}
                    pageCount={numberOfPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination"}
                />
            </PaginationWrapper>}
            <Footer/>
        </StyledCoursePage>
        </div>
    )
}

export default CoursesPage