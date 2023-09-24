import { useState } from 'react';
import { Opinion } from '../../utils/models/Opinion';
import './opinionCard.scss';
import OpinionApi from '../../utils/apis/OpinionApi';
import { trackGoogleAnalyticsEvent } from '../../utils/hooks/useAnalytics';

export enum OpinionCardType {
    add = 'ADD',
    default = 'DEFAULT'
}

interface IOpinionCardProps {
    opinion?: Opinion
    type?: OpinionCardType
    refreshOpinions: () => void
}

const OpinionCard = (props:IOpinionCardProps) => {
    const { opinion, type, refreshOpinions  } = props;

    const [ newOpinion, setNewOpinion ] = useState<Opinion>({authorName: '', opinion: '', avatarLink: ''});

    const onChange = (e:any) => {
        setNewOpinion( { ...newOpinion, [e.target.name]: e.target.value || '' })
    }

    const sendNewOpinion = () => {
        if (newOpinion?.authorName && newOpinion.opinion) {
            OpinionApi.createOpinion(newOpinion).then(()=>{
                trackGoogleAnalyticsEvent('sent_opinion', 'sent_opinion', 'sent_opinion', { opinion: JSON.stringify(newOpinion) })
                refreshOpinions();
                setNewOpinion({ opinion: '', authorName: '', avatarLink: '' })
            });
          
        }
     
    }

    if ( type === OpinionCardType.add ) {
        return (
            <div className='opinionCard'>
                <div className='opinionCard-text'>
                    <textarea onChange={onChange} name='opinion' placeholder='Jezeli masz opinie na temat naszych webinarow, prosimy podziel sie zebysmy mogli ulepszyszyc ich jakosc' value={newOpinion?.opinion}></textarea>
                </div>
                <div className='opinionCard-author'>
                   <input onChange={onChange} type='text' name='authorName' placeholder='Imie' value={newOpinion?.authorName}></input>
                   <input type='submit' onClick={sendNewOpinion}></input>
                </div>
            </div>
        )
    } else {
        return (
            <div className='opinionCard'>
                  <div className='opinionCard-author'>
                    <p>{opinion?.authorName}</p>
                </div>
                <div className='opinionCard-text'>
                    <p>{opinion?.opinion}</p>
                </div>
              
            </div>
        )
    }
  
}

export default OpinionCard;