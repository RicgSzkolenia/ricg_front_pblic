import { useEffect } from "react";
import CourseApi from "../../utils/apis/CourseApi";
import { Course } from "../../utils/models/Course";
import { useParams } from "react-router-dom";

const CourseDetailsPage = () => {

    const params =  useParams()
    useEffect(() => {
        CourseApi.getCourseById(params.id || '1').then((course:Course) => {
            console.log(course);
        })
    }, [])

    return(
        <div>
            <p>Course page</p>
        </div>
    )
}

export default CourseDetailsPage;