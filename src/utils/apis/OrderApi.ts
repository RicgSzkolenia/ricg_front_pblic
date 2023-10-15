import axios from "axios"
import { Order } from "../models/Order";

const getAllOrders = async () => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/orders?populate=*`).then((res) => {

        return res.data.data.map((order:any) => {
            return Order.fromApiJson(order)
        })
    })
}

export default {
    getAllOrders
}