import axios from 'axios';
import { Aim, AimItem } from '../../components/aimSection/aimItems';

const getAllTargets = async () => {
    const targets:Array<AimItem> = await axios.get(`${process.env.REACT_APP_BASE_URL}/targets?populate=*`).then((res) => {
        return res.data.data.map((targetJson:any) => {
            return Aim.fromApiJson(targetJson);
        });
    });
    return targets;
}
export default {
    getAllTargets
}