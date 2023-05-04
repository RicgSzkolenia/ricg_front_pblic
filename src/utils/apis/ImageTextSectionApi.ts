import axios from "axios"
import { ImageTextBlock } from "../models/ImageTextBlock"

const getCourseAuthorBlock = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/course-author-block?populate=*`).then((res) => {
        return ImageTextBlock.fromApiJson(res.data.data);
    })
}

const getAllImageTextBlocks = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/image-text-blocks?populate=*`).then((res) => {
        return res.data.data.map((imageTextBlockJson:any) => {
            return ImageTextBlock.fromApiJson(imageTextBlockJson);
        })
    })
}


export default {
    getAllImageTextBlocks,
    getCourseAuthorBlock
}