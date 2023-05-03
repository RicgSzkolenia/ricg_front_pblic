export class Opinion {

    constructor (public authorName:string, public opinion: string, public avatarLink: string, public id?:string) {}

    static fromApiJson (opinionApiJson:any): Opinion {
        return {
            id: opinionApiJson?.id,
            authorName: opinionApiJson.attributes?.AuthorName,
            opinion: opinionApiJson.attributes?.Description,
            avatarLink: opinionApiJson.attributes?.Avatar?.data?.[0]?.attributes?.url,
        }
    }
}
