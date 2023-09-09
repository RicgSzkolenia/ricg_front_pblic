import './aimSection.scss'
import { AimItem } from "./aimItems";
import Card from '../common/Card';
import { useEffect, useState } from 'react';
import targetApi from '../../utils/apis/TargetApi';
const AimSection = () => {

    const [ aims, setAims ] = useState<Array<AimItem>>([]);

    useEffect(() => {
        targetApi.getAllTargets().then((targets) => {
            setAims(targets)
        });
    }, [])

    return (
        <div className="aims section-top-bottom-margin ">
            <p className="blueSecondaryHeader aims-header section-header-top-bottom-margin" data-aos="fade-up"> Cele Webinaru </p>
            <div className='aims-cardWrapper'>
            { aims.map((aim) => {
                    return(
                        <div key={aim.id}>
                            <Card className='aims-card' >
                                <img src={aim.icon}></img>
                                <p>{aim.text}</p>
                            </Card>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default AimSection;