interface userReducerInitialState{
  isAuthenticated: boolean,
  user: any;
}

const initialState:userReducerInitialState = {
  isAuthenticated: false,
  user: null,
}

const userReducer = (state = initialState, action:any) => {
  switch(action.type){
    default:
      return state
  }

}

export default userReducer