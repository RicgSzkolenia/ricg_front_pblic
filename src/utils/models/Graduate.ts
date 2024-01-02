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
        
        let duration:number = parse(studentDuration?.replaceAll('godz.', 'h').replaceAll('min', 'm')) || 1;
        let coverage = Math.ceil(( duration / webinarDuration ) * 100);

        if (!studentDuration) {
            const parsedJoinTime = moment(timeRegistered).format('DD-MM-yyyy hh:mm:ss');
            const timeDiff =  parse(moment.utc( moment(webinarEndTime,"DD-MM-yyyy hh:mm:ss").diff(moment(parsedJoinTime,"DD-MM-yyyy hh:mm:ss"))).format('hh[h]:mm[min]:ss[sec]')) || 1;
            coverage = Math.ceil(( timeDiff / webinarDuration ) * 100);

        }

        const trimmedName = name?.replaceAll(/[0-9]/g, '')?.replaceAll('/', '') || '';
        const trimmedSurname = surname?.replaceAll(/[0-9]/g, '')?.replaceAll('/', '') || '';
      
        if (!studentEmail && !studentId && !studentRegEmail) {
            console.log('No email', studentEmail, studentId, studentRegEmail);
            const newFields = fields?.[2]?.split('\t');

            const status = coverage > 70 ? GraduationStatus.Completed : GraduationStatus.Failed
            return  new Graduate(studentRegName || trimmedName, studentRegSurname || trimmedSurname, newFields?.[2] || newFields?.[3], studentRole || 'Uczestnik', status);
        }


        const status = coverage > 70 ? GraduationStatus.Completed : GraduationStatus.Failed
        return  new Graduate(studentRegName || trimmedName, studentRegSurname || trimmedSurname, studentEmail || studentId || studentRegEmail, studentRole || 'Uczestnik', status);
    }

   
}