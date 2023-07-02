export class PercCarouselItem {

    constructor (public title:string, public details: string, public image:string, public id?: string) {}

    static fromJsonApi (percJsonApi:any): PercCarouselItem {
        return {
            title: percJsonApi.attributes.title,
            image: percJsonApi.attributes?.image?.data.attributes?.url,
            details: percJsonApi.attributes?.details,
            id: percJsonApi.id
        }
    }
}
