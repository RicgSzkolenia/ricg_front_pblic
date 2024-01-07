import moment from 'moment';
import parse from 'parse-duration'

export enum GraduationStatus  {
    Completed = 'COMPLETED',
    Failed = 'FAILED'
}

export class Graduate { 

    constructor(public name:string, public surname: string, public email: string, public role: string, public status:GraduationStatus) {}

    static createGraduateFromArray (fields: Array<any>, webinarDuration: number, webinarEndTime:string) {

        const [ studentName, studentJoinTime, studentDropTime, studentDuration, studentEmail, studentId, studentRole, studentRegName, studentRegSurname, studentRegEmail, timeRegistered ] = fields;
        let [ name, surname ]: [name: string | undefined, surname: string | undefined ] = studentName.split(' ')
        
        if (!name) {
            name = fields[7]
        }

        if (!surname) {
            surname = fields[8]
        }

        let duration:number;

        if ( fields.length < 5 ) {
            duration =  parse(fields?.[2]?.split('\t')?.[1]?.replaceAll('godz.', 'h').replaceAll('min', 'm')) || 1;
        } else {
            duration = parse(studentDuration?.replaceAll('godz.', 'h').replaceAll('min', 'm')) || 1;
        }
    
        let coverage = Math.ceil(( duration / webinarDuration ) * 100);
       
        const trimmedName = name?.replaceAll(/[0-9]/g, '')?.replaceAll('/', '') || '';
        const trimmedSurname = surname?.replaceAll(/[0-9]/g, '')?.replaceAll('/', '') || '';
        
        if (!studentEmail && !studentId && !studentRegEmail) {
            const newFields = fields?.[2]?.split('\t');
            const status = coverage > 55 ? GraduationStatus.Completed : GraduationStatus.Failed
            // console.log('Sudent: ', fields, 'Webinar duration: ', webinarDuration, 'Student durartion: ', duration, 'Coverage: ', coverage);
            return  new Graduate(studentRegName?.replaceAll('\t', '') || trimmedName?.replaceAll('\t', ''), studentRegSurname?.replaceAll('\t', '') || trimmedSurname?.replaceAll('\t', ''), newFields?.[2] || newFields?.[3] || newFields?.[7], studentRole || 'Uczestnik', status);
        }
        // console.log('Sudent: ', fields, 'Webinar duration: ', webinarDuration, 'Student durartion: ', duration, 'Coverage: ', coverage);
        const status = coverage > 55 ? GraduationStatus.Completed : GraduationStatus.Failed
        return  new Graduate(studentRegName?.replaceAll('\t', '') || trimmedName?.replaceAll('\t', ''), studentRegSurname?.replaceAll('\t', '') || trimmedSurname?.replaceAll('\t', ''), studentEmail || studentId || studentRegEmail, studentRole || 'Uczestnik', status);
    }

   
}