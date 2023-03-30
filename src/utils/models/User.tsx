export class User {
    public id?:string;
    public name: string;
    public  secondName: string;
    public email: string;
    public password: string;

    constructor (name: string, secondName: string, email: string, password: string, id?:string ) {
        this.id = id;
        this.name = name;
        this.secondName = secondName;
        this.email = email;
        this.password = password;
    }
}