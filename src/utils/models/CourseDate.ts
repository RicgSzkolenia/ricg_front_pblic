import { Course } from "./Course"
import { CoursePartDate } from "./CoursePartDate";

export class CourseDate {

    constructor (public date:string, public course: Course | null, public webinarLink: string, public courseDateParts: Array<CoursePartDate> ,public id?:string) {}

    static fromApiJson (courseDateJson:any): CourseDate {
        let course = null;
        if ( courseDateJson?.attributes?.course?.data ) {
            course = Course.fromApiJson(courseDateJson?.attributes?.course?.data)
        }

        let courseParts = null;

        if (courseDateJson?.attributes?.course_part_dates?.data) {
            courseParts = courseDateJson?.attributes?.course_part_dates?.data.map((coursePartJson:any) =>{
                return CoursePartDate.fromApiJson(coursePartJson);
            })
        }

        return {
            id: courseDateJson?.id,
            date: courseDateJson?.attributes?.date,
            webinarLink: courseDateJson?.attributes?.webinarLink,
            course,
            courseDateParts: courseParts
        }
    }
}
