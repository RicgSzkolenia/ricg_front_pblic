import axios from "axios"
import { Course } from "../models/Course";
import { CourseDate } from "../models/CourseDate";

const getAllCourses = async (): Promise<Array<Course>> => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/courses?populate=*`).then((res) => {
        return res.data?.data?.map((courseJson:any) => {
            return Course.fromApiJson(courseJson);
        });
    })
}

const getCourseById = async (id: string): Promise<Course> => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/${id}/?populate=*`).then((res) => {
            return Course.fromApiJson(res.data.data);
    })
}

const getAllCourseDates = async (): Promise<CourseDate> => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/coursedates/?populate=*`).then((res) => {
        return res.data?.data?.map((courseDateJson:any) => {
            return CourseDate.fromApiJson(courseDateJson)
        });
    })
}

export default {
    getAllCourses,
    getCourseById,
    getAllCourseDates
}