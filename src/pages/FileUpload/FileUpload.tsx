import styled from "styled-components";
import CustomDropzone from "../../components/common/DropZone";
import Button, { ButtonTypes } from "../../components/common/Button";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Graduate } from "../../utils/models/Graduate";
import moment from 'moment';
import WebinarReportApi from "../../utils/apis/WebinarReportApi";
import { useNavigate } from "react-router-dom";
import parse from 'parse-duration';
import CourseApi from "../../utils/apis/CourseApi";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const StyledFileUpload = styled.div`
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

const StyledUploadWrapper = styled.div`
    height: 600px;
    width: 500px;
    background-color: #E3E6F7;
    border-radius: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    
    img {
        width: 150px;
    }

    .stats-btn {
        background-color: #9c5b89;
        color: #fff;
        padding: 10px 20px;
        border-radius: 15px; 
        cursor: pointer;

        &:hover {
            transform: scale(1.02);
            background-color: #6149F5;
        }
    }
`

const StyledUploadedFile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    line-height: 24px;
    p { 
        max-width: 80%;
     }
    img { 
        cursor: pointer;
        margin-left: 10px;
        margin-top: 4px;
        width: 20px;
        height: 20px;
    }
`

const FileUpload = () => {

    const [fileData, setFileData ] = useState<any>();
    const [ fileName, setFileName ] = useState();
    const [ options, setOptions ] = useState<Array<any>>([]);
    const [ isSending, setIsSubmiting ] = useState<boolean>(false);
    
    const navigate = useNavigate();


    const getData = (file:any) => {
        Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: function (results:any) {
            
                const dateFormat = 'DD/MM/YYYY-hh:mm:ss';
                const data = results.data
                const participantsStartIndex = data.findIndex((row:any) => row[0].includes('Uczestnicy')) + 2;
                const participantsEndIndex = data.findIndex((row:any) => row[0].includes('Działania podczas spotkania')) - 1
                const title:string = data?.[2]?.[1];
                
                const webinarStartTime:string = data?.[3]?.[1];
                                
                const webinarDuration:number = parse(data?.[8]?.[0].split('\t')?.[1]?.replaceAll('godz.', 'h')?.replaceAll('min', 'm')) || 1 ;
                let graduates:Array<Graduate> = data.slice(participantsStartIndex, participantsEndIndex).map((graduateFields:any) => {
                    return Graduate.createGraduateFromArray(graduateFields, webinarDuration);
                }).filter((graduate:Graduate) => graduate.role?.toLowerCase() !== 'organizator' )

                if (!graduates.every((graduate) => graduate.email !== '')) {
                    alert('Nie kazdy uczesnik posiada email, sprawdz raport')
                }

                graduates = graduates.filter((graduate:Graduate) => graduate.email !== '');

                const preparedFileData = { rawData: JSON.stringify(data), participants: graduates, webinarDate: moment(webinarStartTime, dateFormat).toDate(), title, duration: webinarDuration.toString()};
                setFileData(preparedFileData);
                setFileName(file.name);

               
            },
        });
    }
    
    const handleSubmit = () => {
        if (fileData) {
            WebinarReportApi.createWebinarReport(fileData).then(() => {
                navigate('/');
            })
        }
    } 

    const handleFileDelete = () => {
        setFileData(undefined);
        setFileName(undefined);
    }

    useEffect(() => {
        CourseApi.getAllCourses().then((courses) => {
            const tmpOptions = courses.map((course) => { 
                return { value: course.id as string || '', label: course.title }
             })
             setOptions(tmpOptions)
        })
    }, [])



    return(
            <StyledFileUpload>
                <img
                src={"/GroupnewColor.svg"}
                style={{ width: "30%", height: "auto" }}
                ></img>
                <StyledUploadWrapper>
                    <img src='https://res.cloudinary.com/dtb1fvbps/image/upload/v1686685604/logo_White_F_8df86b15c6.svg'/>
                    <div onClick={() => {navigate('/stats')}} className="stats-btn">Statystyki zamówień</div>
                    <p className="blueMainText">Webinar Participants Upload</p>
                    { fileData ? (
                        <StyledUploadedFile>  
                            <p>{fileName}</p>      
                            <img src="./xmark-solid.svg" onClick={handleFileDelete}/>
                        </StyledUploadedFile>) 
                        : <CustomDropzone getData={getData}/>
                    }    
                    <Dropdown onChange={(e) => {setFileData({...fileData, courseId: e.value, courseName: e.label}) }} options={options} placeholder="Wybierz typ webinaru" />
                    {  fileData && fileData.courseId ?  <Button type={ButtonTypes.default} handleClick={handleSubmit}>Wyślij</Button> : '' }
                  
                </StyledUploadWrapper>
            </StyledFileUpload>
    )
}

export default FileUpload;