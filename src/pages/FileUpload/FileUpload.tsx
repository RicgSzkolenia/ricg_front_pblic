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
import NavBar from "../../components/header/navBar/NavBar";
import { CourseDate } from "../../utils/models/CourseDate";
import { CoursePartDate } from "../../utils/models/CoursePartDate";


const StyledFileUpload = styled.div`
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .Dropdown-control {
        width: 450px;
        border-radius: 10px;

    }


    .Dropdown-menu {
        margin-top: 5px;
        border-radius: 15px;
        
    }
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

    const [courseDates, setCourseDates] = useState<Array<CourseDate>>();

    const [fileData, setFileData ] = useState<any>();
    const [ fileName, setFileName ] = useState();
    
    const [ selectedCourseDate, setSelectedCourseDate ] = useState<CourseDate>();
    const [ selectedCoursePartDate, setSelectedCoursepartDate ] = useState<CoursePartDate>();

    const [ courseDateOptions, setCourseDateOptions ] = useState<Array<{ value: string, label: string }>>();
    const [ coursePartDateOptions, setCoursePartDateOptions ] = useState<Array<{ value: string, label: string }>>();

    const [disabled, setDisabled] = useState<boolean>(true);
    
    const navigate = useNavigate();
    
    const handleSubmit = () => {
        if (fileData) {
            WebinarReportApi.createWebinarReport(fileData, selectedCourseDate, selectedCoursePartDate).then(() => {
                navigate('/');
            })
        }
    } 

    const handleFileDelete = () => {
        setFileData(undefined);
        setFileName(undefined);
    }

    const selectWebinarName = (e:any) => {
        const selectedCourseDate = courseDates?.find((courseDate) => {return courseDate.id === e.value });
        const partsDatesSelectedOptions = selectedCourseDate?.courseDateParts.map((coursePart, index:number) => {
            return { value: coursePart.id || `${index}`, label: coursePart.date }
        })
        setCoursePartDateOptions(partsDatesSelectedOptions || []);
       setSelectedCourseDate(selectedCourseDate)
    }

    const selectWebinarPart = (e:any) => {
        setSelectedCoursepartDate(selectedCourseDate?.courseDateParts.find((part) => part.id === e.value))
    }

    const handleFileUpload = (file:any) => {

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
                                
                const webinarDuration:number = parse(data?.[8]?.[1]?.split('\t')?.[0]?.replaceAll('godz.', 'h')?.replaceAll('min', 'm')) || 1 ;
                const webinarEndTime: string | any = moment(data?.[7]?.[1]).format('DD-MM-yyyy hh:mm:ss');
                const graduates:Array<Graduate> = data.slice(participantsStartIndex, participantsEndIndex).map((graduateFields:any) => {
                    return Graduate.createGraduateFromArray(graduateFields, webinarDuration, webinarEndTime);
                }).filter((graduate:Graduate) => graduate.email).filter((graduate:Graduate) => graduate.email !== '' || graduate.name !== '' || graduate.surname !== '' )
                .filter((graduate:Graduate) => graduate.status !== 'FAILED').filter((graduate:Graduate) => graduate.role?.toLowerCase() !== 'organizator');
    
                if (!graduates.every((graduate) => graduate.email !== '')) {
                    alert('Nie kazdy uczesnik posiada email, sprawdz raport')
                }
    
                const graduatesEmails:Array<string> = [];
    
                const uniqGraduates = graduates?.filter((graduate) => {
                    if(!graduatesEmails.includes(graduate.email)){
                        graduatesEmails.push(graduate.email);
                        return true
                    } else {
                        return false;
                    }
                })

                const preparedFileData = { rawData: JSON.stringify(data), participants: uniqGraduates, webinarDate: moment(webinarStartTime, dateFormat).toDate(), title, duration: webinarDuration.toString()};
                setFileData(preparedFileData);
                setFileName(file.name);
            },
        });



    }

    useEffect(() => {
        if ((selectedCourseDate?.courseDateParts.length || 0) > 0) {
            Promise.all(selectedCourseDate?.courseDateParts?.map((part) => {

                const fetchedpart = CourseApi.getCoursePartDateById(part.id || '');
                return fetchedpart;
            }) || []).then((res:any) => {
                const fetchedParts = res.map((res:any) => res?.data?.data);
                const reportedPartsIds = fetchedParts.filter((coursePartDate:any) => {
                    return !(coursePartDate?.attributes?.course_report?.data);
                }).map((part:any) => part?.id);
                const updatedWithNamesParts = coursePartDateOptions?.filter((option) => reportedPartsIds.includes(option.value) )?.map((partDateOption) => {
                    const fetchedPart = fetchedParts.find((part:any) => part?.id === partDateOption?.value)
                    const newLabel = partDateOption?.label + ' ' + fetchedPart?.attributes?.course_parts?.data?.[0]?.attributes?.header;
                    return { value: partDateOption.value, label: newLabel }
                })
                
                setCoursePartDateOptions(updatedWithNamesParts);
            })
        }
      
    }, [selectedCourseDate])
    

    useEffect(() => {
        const isFileDataSelected = !!fileData;
        const isSelectedCourseDate = !!selectedCourseDate
        const isPartOfParts = (selectedCourseDate?.courseDateParts?.length || 0) > 0;
        if ( isPartOfParts ) {
            return setDisabled(!(isFileDataSelected && isSelectedCourseDate && !!selectedCoursePartDate));
        } else {
            return setDisabled(!(isFileDataSelected && isSelectedCourseDate));
        }

    }, [selectedCourseDate, selectedCoursePartDate, fileData])

    useEffect(() => {
       CourseApi.getAllCourseDates().then((res) => {
        setCourseDates(res);
        const courseDateOptions = res.map((courseDate, index) => {
            return {
                value: courseDate?.id || `${index}`,
                label: moment(courseDate.date).format('DD-MM-yyyy hh:mm') + ' ' + courseDate.course?.title 
            }
        }) || []
        setCourseDateOptions(courseDateOptions)
       })
    }, [])


    
    return(
            <StyledFileUpload>
                <NavBar/>
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
                        : <CustomDropzone getData={handleFileUpload}/>
                    }    
                    <Dropdown onChange={selectWebinarName} options={courseDateOptions || []} placeholder="Wyberz Webinar" />
                    { (selectedCourseDate?.courseDateParts?.length || 0) > 0 && <Dropdown onChange={selectWebinarPart} options={coursePartDateOptions || []} placeholder="Wybierz Czesc Webinaru" />}
                  

                    <Button disabled={disabled} type={ButtonTypes.default} handleClick={handleSubmit}>Wyślij</Button>
                </StyledUploadWrapper>
            </StyledFileUpload>
    )
}

export default FileUpload;