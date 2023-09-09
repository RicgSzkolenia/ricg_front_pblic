import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import Papa from 'papaparse';
import styled from 'styled-components';

const StyledDropZone = styled.div`
    cursor: pointer;
    margin: 10px;
    height: 150px;
    width: 350px;
    background-color: #9c5b89;  
    border-radius: 20px;
    outline: 2px dashed #000;
    padding: 10px;
    color: #fff;
    font-size: 22px;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 120px;

`

const  CustomDropzone = (props:any) => {
    
    const onDrop = useCallback((acceptedFiles:any) => {
        acceptedFiles.forEach((file:any) => {
          return props.getData(file);
        })
        
      }, [])

      const {getRootProps, getInputProps} = useDropzone({onDrop})
    
      return (
        <StyledDropZone {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Upload or Drop file here</p>
        </StyledDropZone>
      )
}

export default CustomDropzone;


