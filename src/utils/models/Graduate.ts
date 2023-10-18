import parse from 'parse-duration'

export enum GraduationStatus  {
    Completed = 'COMPLETED',
    Failed = 'FAILED'
}

export class Graduate { 

    constructor(public name:string, public surname: string, public email: string, public role: string, public status:GraduationStatus) {}

    static createGraduateFromArray (fields: Array<any>, webinarDuration: number) {
        
        const [ name, surname ]: [name: string | undefined, surname: string | undefined ] = fields[0].split(' ')
        
        
        const [joinTime, dutation, email, secondEmail, role]:Array<string>= fields[2].split('\t');
        
        const trimmedName = name?.replaceAll(/[0-9]/g, '')?.replaceAll('/', '') || '';
        const trimmedSurname = surname?.replaceAll(/[0-9]/g, '')?.replaceAll('/', '') || '';
        const duration:number =  parse(dutation.replaceAll('godz.', 'h').replaceAll('min', 'm')) || 1;
        const coverage = Math.ceil(( duration / webinarDuration ) * 100);

        const status = coverage > 85 ? GraduationStatus.Completed : GraduationStatus.Failed
        
        return  new Graduate(trimmedName, trimmedSurname, email, role, status);
    }

   
}

