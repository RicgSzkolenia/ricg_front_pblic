import axios from 'axios';
import { Opinion } from '../models/Opinion';

const getAllOpinions = async () => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/opinions?populate=*`).then((res) => {
        return res.data?.data?.map((opinionApiJson:any) => {
            return Opinion.fromApiJson(opinionApiJson)
        })
    })
};

export default {
    getAllOpinions
}