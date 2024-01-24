import { useDispatch } from 'react-redux';
import './horizontalCourseCard.scss';
import cartActions from '../../store/actions/cartActions';
import { trackGoogleAnalyticsEvent } from '../../utils/hooks/useAnalytics';

const HorizontalCourseCard = (props:any) => {
    const { item, index } = props;
    const dispatch = useDispatch();

    const changeQuanity = (e:any) => {
            dispatch(cartActions.changeQuantity({...item, quantity: e.target.value}))        
    }

    const removeFromCart = (index: any) => {
        trackGoogleAnalyticsEvent('remove_from_cart', 'remove_from_cart', 'remove_from_cart', {item: JSON.stringify(item)})
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
                <input style={{ textAlign: 'center' }}  min="1" type='number' onChange={changeQuanity} value={item.quantity}></input> szt
                { item.course.redeemedPrice ? (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 110 }}>
                        <p>{item.course.redeemedPrice} zł</p> 
                        <p style={{ textDecoration: 'line-through', fontSize: '16px' }}>{ item.course.price } zł</p>  
                    </div>
                    <p style={{ fontSize: 16 }}>{Math.ceil(item.course.redeemedPrice/ 1.23)} zł netto</p>
                </div>) 
                
                : (<div >
                        <p>{Math.ceil(item.course.price)} zł</p>
                        <p style={{ fontSize: 15 }}>{Math.ceil(item.course.price / 1.23)} zł netto</p>
                    </div> )}
                <div className='horizontal-card-wrapper-action-button' onClick={() => {removeFromCart(index)}}>
                    Usuń z koszyka
                </div>
            </div>
        </div>
    )
}

export default HorizontalCourseCard