import axios from 'axios';

const createWebinarReport = async (fileData:any, selectedDate:any, selectedPartDate:any ) => {
    return await axios.post(`${process.env.REACT_APP_BASE_URL}/coursereports`, { data: { fileData, selectedDate, selectedPartDate  }})
}

export default {
    createWebinarReport
}