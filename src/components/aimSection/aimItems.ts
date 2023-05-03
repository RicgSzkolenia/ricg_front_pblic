export interface AimItem {
    id?:number;
    icon: string;
    title: string;
    text: string;
}

export class Aim {
 constructor( public icon: string, public title: string, public text: string) {}

 static fromApiJson (json:any): AimItem {
    return {id: json?.id, icon: json?.attributes?.Icon?.data?.[0]?.attributes?.url, title: '', text: json?.attributes?.Description}
 }
}