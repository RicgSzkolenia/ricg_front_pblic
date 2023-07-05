import axios from "axios"

const loginRequest = async (identifier: string, password: string) => {

    return await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/local`, { identifier: identifier ,  password: password }).then((res) => {
        return res;
    })
}

export default {
    loginRequest
}