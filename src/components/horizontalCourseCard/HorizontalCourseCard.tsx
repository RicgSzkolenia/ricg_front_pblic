import { useDispatch } from 'react-redux';
import './horizontalCourseCard.scss';
import cartActions from '../../store/actions/cartActions';

const HorizontalCourseCard = (props:any) => {
    const { item, index } = props;
    const dispatch = useDispatch();

    const changeQuanity = (e:any) => {
            dispatch(cartActions.changeQuantity({...item, quantity: e.target.value}))        
    }

    const removeFromCart = (index: any) => {
        dispatch(cartActions.removeItemFromCart(index))
    }
    
    return (
        <div className="horizontal-card-wrapper">
            <img className='horizontal-card-wrapper-image' src={item.course.image}></img>
            <div className="horizontal-card-wrapper-body">
                <div className="horizontal-card-wrapper-body-header">
                    <p>{ item.course.category }</p>
                </div>
                <div className='horizontal-card-wrapper-body-content'>
                    <p>{ item.course.title }</p>
                    <div className='courseCard-separator'></div>
                    <span>{ item.course.shortDescription }</span>
                </div>
                <div className='horizontal-card-wrapper-body-date'>
                    <p>Termin: </p>
                    <div>
                        {item.date.label}
                    </div>
                </div>
            </div>
            <div className='horizontal-card-wrapper-action'>
                <input  min="1" type='number' onChange={changeQuanity} value={item.quantity}></input>
                { item.course.redeemedPrice ? (<div><p>{item.course.redeemedPrice} zł</p> <p style={{ textDecoration: 'line-through' }}>{ item.course.price } zł</p>  </div>) : <p>{item.course.price} zł</p> }
                <div className='horizontal-card-wrapper-action-button' onClick={() => {removeFromCart(index)}}>
                    Usuń z koszyku
                </div>
            </div>
        </div>
    )
}

export default HorizontalCourseCard