import { AllAuthActionTypes } from "../actions/authActions";

interface userReducerInitialState{
  isAuthenticated: boolean,
  user: any;
  jwt: string;
}

const initialState:userReducerInitialState = {
  isAuthenticated: false,
  user: {},
  jwt: '',
}

const userReducer = (state = initialState, action:any) => {
  switch(action.type){
      case AllAuthActionTypes.SET_USER:
      return {...state, isAuthenticated: true, user: action.user, jwt: action.jwt};
      default:
      return state
  }

}

export default userReducer