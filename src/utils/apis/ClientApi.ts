import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_API_TOKEN;


const getAllClients = async () => {

    return axios.get(`${BASE_URL}/clients`);

}

const createClient = () => {

}

const updateClient = () => {

}

const deleteClient = () => {

}

export default {getAllClients, createClient, updateClient, deleteClient}