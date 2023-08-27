import axios from 'axios';
import { Opinion } from '../models/Opinion';

const getAllOpinions = async () => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/opinions?populate=*`).then((res) => {
        return res.data?.data?.map((opinionApiJson:any) => {
            return Opinion.fromApiJson(opinionApiJson)
        })
    })
};

const createOpinion = async (opinion:Opinion) => {
    const convertedOpinion = Opinion.toApiJson(opinion)
    return await axios.post(`${process.env.REACT_APP_BASE_URL}/opinions`,  { data: { ...convertedOpinion }}).then((res) => {
    })
}

export default {
    getAllOpinions,
    createOpinion
}