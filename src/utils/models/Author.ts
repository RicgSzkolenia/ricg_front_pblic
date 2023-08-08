export class Author {
    constructor (public name: string, public surname: string, public description: string, public image: string) {}

    static fromJson (json: any) {
        return {
            name: json?.Name,
            surname: json?.Surname,
            description: json?.description,
            image: json?.image?.data?.attributes?.url
        }
    }
}