import './authorCard.scss';
import parse from 'html-react-parser';
import { Author } from '../../utils/models/Author';

interface IAuthorCardProps {
    author: Author;
}

const AuthorCard = (props:IAuthorCardProps) => {
    const { author } = props;
    return (
        <div className='authorCard'>
            <div className='authorCard-image'>
                <img src={author.image}></img>
            </div>
            <div className='authorCard-name'>
                <p>{ author.name + ' ' + author.surname }</p>
            </div>
            <div className='authorCard-description blackMainText'>
                <p>{  parse(author.description || '') }</p>
            </div>

        </div>
    )
}

export default AuthorCard