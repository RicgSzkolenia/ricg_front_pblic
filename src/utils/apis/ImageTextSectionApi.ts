import axios from "axios"
import { ImageTextBlock } from "../models/ImageTextBlock"

const getAllImageTextBlocks = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/image-text-blocks?populate=*`).then((res) => {
        return res.data.data.map((imageTextBlockJson:any) => {
            return ImageTextBlock.fromApiJson(imageTextBlockJson);
        })
    })
}


export default {
    getAllImageTextBlocks
}