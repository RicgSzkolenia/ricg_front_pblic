import { Course } from "../../utils/models/Course";

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';

const addToCart = (course:any) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        item: course
    }
}

const removeItemFromCart = (index: string | number) => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        index
    }
}

export default {
   addToCart,
   removeItemFromCart
}