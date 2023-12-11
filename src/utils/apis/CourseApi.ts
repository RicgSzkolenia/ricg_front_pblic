import axios from "axios"
import { Course } from "../models/Course";
import { CourseDate } from "../models/CourseDate";
import { CoursePartDate } from "../models/CoursePartDate";

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

const getAllCourseDates = async (): Promise<Array<CourseDate>> => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/coursedates/?populate=*`).then((res) => {
        return res.data?.data?.map((courseDateJson:any) => {
            return CourseDate.fromApiJson(courseDateJson)
        });
    })
}

const getCourseDateById = async (id:string):Promise <CourseDate> => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/coursedates/${id}?populate=*`).then((res) => {
        return res.data.data;
    });
}

const getAllCoursePartDates = async():Promise<Array<CoursePartDate>> => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/coursepartdates/?populate=*`).then((res:any) => {
        return res.data?.data?.map((coursePartDateJson:any) => {
            return CoursePartDate.fromApiJson(coursePartDateJson);
        })
    })
}

const getCoursePartDateById = async(id:string): Promise<CoursePartDate> => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/coursepartdates/${id}?populate=*`);
}



export default {
    getAllCourses,
    getCourseById,

    getAllCourseDates,
    getCourseDateById,

    getAllCoursePartDates,
    getCoursePartDateById
}