import axios from "axios"
import { Course } from "../models/Course";

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

export default {
    getAllCourses,
    getCourseById
}