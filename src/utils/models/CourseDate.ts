import { Course } from "./Course"

export class CourseDate {

    constructor (public date:string, public course: Course | null, public webinarLink: string, public id?:string) {}

    static fromApiJson (courseDateJson:any): CourseDate {
        let course = null;
        if ( courseDateJson?.attributes?.course?.data ) {
            course = Course.fromApiJson(courseDateJson?.attributes?.course?.data)
        }
       

        return {
            id: courseDateJson?.id,
            date: courseDateJson?.attributes?.date,
            webinarLink: courseDateJson?.attributes?.webinarLink,
            course,
        }
    }
}
