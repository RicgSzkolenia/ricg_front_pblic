export class PercCarouselItem {

    constructor (public title:string, public image:string, public id?: string) {}

    static fromJsonApi (percJsonApi:any): PercCarouselItem {
        return {
            title: percJsonApi.attributes.title,
            image: percJsonApi.attributes?.image?.data.attributes?.url,
            id: percJsonApi.id
        }
    }
}
