import { Course } from "../../utils/models/Course";

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY';

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

const changeQuantity = (newItem:any) => {
    return {
        type: CHANGE_ITEM_QUANTITY,
        item: newItem
    }
}


export default {
   addToCart,
   removeItemFromCart,
   changeQuantity
}