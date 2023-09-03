export class Course  {
    constructor( public id: any, public title: string, public image: string, public category: string, public isOnline: boolean, public shortDescription:string, public cardPoints: any, public points: any, public price: number,  public courseDates: Array<any>, public redeemedPrice?: number ) {}

    static fromApiJson (json:any) : Course {
        const dates = json.attributes?.course_dates?.data.map((date:any) => {
            return {
                id: date?.id,
                date: date?.attributes?.date
            }
        })
        
        return {
            id: json?.id,
            title: json?.attributes?.Title,
            category: json.attributes?.Type,
            cardPoints: Object.values(json.attributes?.cardPoints || {}),
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