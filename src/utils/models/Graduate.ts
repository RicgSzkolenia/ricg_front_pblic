import parse from 'parse-duration'

export enum GraduationStatus  {
    Completed = 'COMPLETED',
    Failed = 'FAILED'
}

export class Graduate { 

    constructor(public name:string, public surname: string, public email: string, public role: string, public status:GraduationStatus) {}

    static createGraduateFromArray (fields: Array<any>, webinarDuration: number) {
        
        const [ name, surname ] = fields[0].split(' ')
        
        const email = fields[4];
        const role = fields[5];
        
        const duration:number = parse(fields[3], 'm') || 1;
        const coverage = Math.ceil(( duration / webinarDuration ) * 100);
        const status = coverage > 85 ? GraduationStatus.Completed : GraduationStatus.Failed
        
        return  new Graduate(name, surname, email, role, status);
    }

   
}

