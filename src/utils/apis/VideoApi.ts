import axios from 'axios';
import { Aim, AimItem } from '../../components/aimSection/aimItems';

const getAllVideos = async () => {
    const videos:Array<AimItem> = await axios.get(`${process.env.REACT_APP_BASE_URL}/tiktoks`).then((res) => {
        return res.data.data.map((videoLink:any) => {
            return videoLink.attributes.tiktokLink;
        });
    });
    return videos;
}
export default {
    getAllVideos
}