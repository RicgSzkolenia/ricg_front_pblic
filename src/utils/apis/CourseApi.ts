import axios from "axios"
import { Course } from "../models/Course";

const getAllCourses = async () => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/courses?populate=*`).then((res) => {
        return res.data?.data?.map((courseJson:any) => {
            return Course.fromApiJson(courseJson);
        });
    })
}

export default {
    getAllCourses
}