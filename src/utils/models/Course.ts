export class Course  {
    constructor(public title: string, public type: string, public points: Array<string>, public  price: number, public link: string, public id?:string,  ) {}

    static fromApiJson (json:any) : Course {

        return {
            id: json?.id,
            title: json?.attributes?.Title,
            type: json.attributes?.Type,
            points: Object.values(json.attributes?.BulletPoints || {}),
            price: json.attributes?.Price,
            link: json.attributes?.actionLink
        }
    }
}