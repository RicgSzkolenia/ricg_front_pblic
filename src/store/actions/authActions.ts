export const SET_USER = 'SET_USER'

const setUser = (user:any, jwt:string) => {
    return {
      type: SET_USER,
      user,
      isAuthenticated: true,
      jwt: jwt
    }
}


export const AllAuthActionTypes = {
    SET_USER
}

export default {
    setUser
}
