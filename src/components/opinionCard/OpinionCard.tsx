import { Opinion } from '../../utils/models/Opinion';
import './opinionCard.scss';

interface IOpinionCardProps {
    opinion: Opinion
}

const OpinionCard = (props:IOpinionCardProps) => {
    const { opinion  } = props;
    return (
        <div className='opinionCard'>
            <div className='opinionCard-text'>
                <p>{opinion.opinion}</p>
            </div>
            <div className='opinionCard-author'>
                <p>{opinion.authorName}</p>
            </div>
        </div>
    )
}

export default OpinionCard;