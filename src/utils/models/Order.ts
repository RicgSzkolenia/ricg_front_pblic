import { Course } from "./Course"
import { CourseDate } from "./CourseDate"

interface RawProduct {
        date: string,
        quantity: number,
        productId: string,
        productTitle: string

}

export class Order {

    constructor (public paymentId:string, public rawProducts: RawProduct, public email: string, public paymentStatus:string, public courseDate:CourseDate, public id?:string) {}

    static fromApiJson (orderJson:any): Order {

        return {
            id: orderJson?.id,
            paymentId: orderJson.attributes?.paymentId,
            rawProducts: orderJson.attributes?.rawProducts?.[0],
            email: orderJson.attributes?.email,
            paymentStatus: orderJson.attributes?.paymentStatus,
            courseDate:  CourseDate.fromApiJson(orderJson.attributes?.course_dates?.data?.[0])
        }
    }
}
