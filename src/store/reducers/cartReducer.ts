import { Course } from "../../utils/models/Course";
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../actions/cartActions";

interface cartReducerInitialState {
    items: Array<{course: Course, date: any}>
}

const initialState:cartReducerInitialState = {
    items: []
  }

const cartReducer = (state = initialState, action:any) => {
    switch(action.type){
        case ADD_PRODUCT_TO_CART:
            return {...state, items: [...state.items, action.item]};
        case REMOVE_PRODUCT_FROM_CART: 
            const old = [...state.items];
            old.splice(action.index, 1);
            return { ...state, items: [...old] }
        default:
            return state
    }
  
  }
  
  export default cartReducer;