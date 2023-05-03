export class ImageTextBlock {
    constructor (public title:string, public subTitile: string, public image: string, public text: string, public id?:string ) {}

    static fromApiJson (imageTextJson: any): ImageTextBlock {
        return {
            id: imageTextJson?.id,
            title: imageTextJson.attributes?.Title,
            subTitile: imageTextJson.attributes?.SubTitile,
            image: imageTextJson.attributes?.image?.data?.[0]?.attributes?.url,
            text: imageTextJson.attributes?.Text
        }
    }
}