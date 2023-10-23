import moment from "moment";
import { Course } from "../../utils/models/Course";
import { ADD_PRODUCT_TO_CART, CHANGE_ITEM_QUANTITY, REMOVE_PRODUCT_FROM_CART } from "../actions/cartActions";

interface cartReducerInitialState {
    items: Array<{course: Course, date: any, quantity: number}>
}

const initialState:cartReducerInitialState = {
    items: []
  }

const cartReducer = (state = initialState, action:any) => {
    switch(action.type){
        case ADD_PRODUCT_TO_CART:
            const foundItemIndex = state.items.findIndex((item) => {
                const isSameCourseId = item.course.id === action.item.course.id;
                const isSameDate =  moment(action.item.date.label, "MMMM Do YYYY, HH:mm:ss").isSame(moment(item.date.label, "MMMM Do YYYY, HH:mm:ss"));
                return isSameCourseId && isSameDate;
            });

            if (foundItemIndex !== -1) {
                const tmpItems = [ ...state.items ]
                tmpItems[foundItemIndex] = { ...tmpItems[foundItemIndex], quantity: tmpItems[foundItemIndex].quantity + 1 }

                return {...state, items: tmpItems }
            } else {
                return {...state, items: [...state.items, action.item]};
            }

        case REMOVE_PRODUCT_FROM_CART: 
            const old = [...state.items];
            old.splice(action.index, 1);
            return { ...state, items: [...old] }
        case CHANGE_ITEM_QUANTITY: 
            const itemIndex = state.items.findIndex((item) => {
                return item.date.value === action.item.date.value && item.course.id === action.item.course.id;
            } )

            const tmpItems = [ ...state.items ];
            tmpItems[itemIndex] = action.item;

            return {...state, items: [...tmpItems]}
        default:
            return state
    }
  
  }
  
  export default cartReducer;