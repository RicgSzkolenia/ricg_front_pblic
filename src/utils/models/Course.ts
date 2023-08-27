export class Course  {
    constructor( public id: string, public title: string, public image: string, public category: string, public isOnline: boolean, public shortDescription:boolean, public points: any, public price: number,  public courseDates: Array<any>, public redeemedPrice?: number ) {}

    static fromApiJson (json:any) : Course {
        const dates = json.attributes?.course_dates?.data.map((date:any) => {
            return {
                id: date?.id,
                date: date?.attributes?.date
            }
        })
        console.log(json.attributes?.BulletPoints);
        return {
            id: json?.id,
            title: json?.attributes?.Title,
            category: json.attributes?.Type,
            points: Object.values(json.attributes?.BulletPoints || {}),
            isOnline: json.attributes.isOnline,
            price: json.attributes?.Price,
            redeemedPrice: json.attributes?.redeemedPrice,
            image: json.attributes?.image?.data?.attributes?.url,
            shortDescription: json.attributes?.shortDescription,
            courseDates: dates
        }
    }
}