import { Course } from "./Course"

export class CoursePart  {
    constructor( public id: any, public header: string, public course: Course, public description: string ) {}

    static fromApiJson (json:any) : CoursePart {
        
        return {
            id: json?.id,
            header: json?.attributes?.header,
            description: json?.attributes?.description,
            course: json.attributes?.course,
        }
    }
}