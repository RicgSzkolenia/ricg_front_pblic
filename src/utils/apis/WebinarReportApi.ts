import axios from 'axios';

const createWebinarReport = async (data:any) => {
    return await axios.post(`${process.env.REACT_APP_BASE_URL}/coursereports`, { data: { ...data }})
}

export default {
    createWebinarReport
}