import { useState } from 'react';
import NavBar from '../../components/header/navBar/NavBar';
import './paymentStatus.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentStatus = () => {

    const [searchParams] = useSearchParams();
    const [isSuccess, setIsSuccess] = useState<boolean>(searchParams.get('success') === 'true');
    const navigate = useNavigate();
   
    return (
        <div className='paymentStatus'>
            <NavBar/>
            <div className='paymentStatus-card'>
                <div className='paymentStatus-card-icon'>
                    <img src={ isSuccess ? '/roseIcons/successPayment.png' : '/roseIcons/failedPayment.png' }></img>
                </div>
                <div className='paymentStatus-card-header'>
                   { isSuccess? 'Płatność zaakceptowana' : 'Płatność nieudana' } 
                </div>
                <div className='paymentStatus-card-body'>
                    {isSuccess ? 'Dziękujemy za zakup naszego webinaru. Wszystkie dodatkowe informacje są wysłane na mail podany przy płatności':
                    'Zakup nieopłacony. Środki nie zostały pobrane z Twojego konta. Zakup czeka na Twoją płatność' } 
                </div>
                <div onClick={()=>{
                    isSuccess ? navigate('/') : navigate('/products')
                }} className='paymentStatus-card-action'>{ isSuccess ? 'Home' : 'Webinary' }</div>
            </div>
        </div>
    )
}

export default PaymentStatus;