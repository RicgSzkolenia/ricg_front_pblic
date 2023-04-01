import './aimSection.scss'
import { aims } from "./aimItems";
import Card from '../common/Card';

const AimSection = () => {
    return (
        <div className="aims">
            <p className="blueHeader aims-header"> Cele Webinaru </p>
            { aims.map((aim) => {
                return(
                    <Card className='aims-card'>
                        <img src={aim.icon}></img>
                        <p>{aim.text}</p>
                    </Card>
                )
            }) }
        </div>
    )
}

export default AimSection;