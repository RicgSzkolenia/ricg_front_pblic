import './opinionCard.scss';

interface IOpinionCardProps {
    avatarLink: string,
    opinion: string
}

const OpinionCard = (props:IOpinionCardProps) => {
    const { avatarLink, opinion  } = props;
    return (
        <div className='opinionCard'>
            <div className='opinionCard-avatar'>
                <img src={avatarLink}></img>
            </div>
            <div className='opinionCard-text'>
                <p>{opinion}</p>
            </div>
        </div>
    )
}

export default OpinionCard;