import { Course } from "./Course"
import { CoursePart } from "./CoursePart"

export class CoursePartDate {

    constructor (public date:string, public coursePart: CoursePart, public id?:string) {}

    static fromApiJson (courseDateJson:any): CoursePartDate {

        return {
            id: courseDateJson?.id,
            date: courseDateJson?.attributes?.date,
            coursePart: courseDateJson?.attributes?.course_part
        }
    }
}
