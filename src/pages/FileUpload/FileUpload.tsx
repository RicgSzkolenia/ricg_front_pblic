import styled from "styled-components";
import CustomDropzone from "../../components/common/DropZone";
import Button, { ButtonTypes } from "../../components/common/Button";
import { useState } from "react";
import Papa from "papaparse";
import { Graduate } from "../../utils/models/Graduate";
import moment from 'moment';

const StyledFileUpload = styled.div`
    height: 100vh;
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
`

const StyledUploadedFile = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    line-height: 24px;
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
    
    const getData = (file:any) => {
        Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: function (results:any) {
                const dateFormat = 'DD/MM/YYYY-hh:mm:ss';
                const data = results.data
                
                const title:string = data?.[2]?.[1];
                
                const webinarStartTime:string = data?.[3]?.[1];
                const webinarEndTime:string = data?.[4]?.[1];
                
                
                const webinarDuration:number = moment.duration(moment(webinarEndTime, dateFormat).diff(moment(webinarStartTime, dateFormat))).asMinutes();
                const graduates:Array<Graduate> = data.slice(7, data.length - 1).map((graduateFields:any) => {
                    return Graduate.createGraduateFromArray(graduateFields, webinarDuration);
                })
                
                console.log(graduates);
                setFileData({raw: data, participants: graduates, webinarStartTime, webinarEndTime, title});
                setFileName(file.name);
            },
        });
    }

    const parseWebinarJson = () => {

    }
    
    const handleSubmit = () => {
        if (fileData) {
            console.log('Uploading data: ', fileData);
        }
    } 

    const handleFileDelete = () => {
        setFileData(undefined);
        setFileName(undefined);
    }

    return(
            <StyledFileUpload>
                <img
                src={"/GroupnewColor.svg"}
                style={{ width: "30%", height: "auto" }}
                ></img>
                <StyledUploadWrapper>
                    <img src='https://res.cloudinary.com/dtb1fvbps/image/upload/v1686685604/logo_White_F_8df86b15c6.svg'/>
                    <p className="blueMainText">Webinar Participants Upload</p>
                    { fileData ? (
                        <StyledUploadedFile>  
                            <p>{fileName}</p>      
                            <img src="./xmark-solid.svg" onClick={handleFileDelete}/>
                        </StyledUploadedFile>) 
                        : <CustomDropzone getData={getData}/>
                    }  
                    <Button type={ButtonTypes.default} handleClick={handleSubmit}>Wyślij</Button>
                </StyledUploadWrapper>
            </StyledFileUpload>
    )
}

export default FileUpload;