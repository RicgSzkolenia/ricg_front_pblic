import { useSelector } from "react-redux"
import { AppState } from "../../store/store"
import NavBar from "../../components/header/navBar/NavBar"
import Footer from "../../components/footer/Footer"
import './cart.scss'
import HorizontalCourseCard from "../../components/horizontalCourseCard/HorizontalCourseCard"
import { useEffect, useState } from "react"
import { checkOutProductsFromCart } from "../../utils/hooks/usePayment"
import Modal from "../../components/modal/Modal"
import ContactInfoApi from "../../utils/apis/ContactInfoApi"
import ReactGA from "react-ga4";
import { trackGoogleAnalyticsEvent } from "../../utils/hooks/useAnalytics"

const Cart = () => {
    
    const cartItems = useSelector((state:AppState) => state.cart.items);
    const [ cartSum, setCartSum ] = useState<number>(0)
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ isAgreedRodo, setIsAgreedRodo ] = useState<boolean>(false);
    const [ isAgreedReg, setIsAgreedReg ] = useState<boolean>(false);
    const [ contactInfo, setContactInfo ] = useState<any>();

    const proceedToPayment = () => {
        if  ( isAgreedRodo && isAgreedReg ) {
            trackGoogleAnalyticsEvent('begin_checkout', 'begin_checkout', window.location.pathname + window.location.search, { cartItems: JSON.stringify(cartItems) } )
            checkOutProductsFromCart(cartItems)
        }
        
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        ContactInfoApi.getContactInfo().then((info:any) => {
            setContactInfo(info);
        })

        ReactGA.send({
          hitType: 'pageview',
          page: window.location.pathname,
          title: 'cart',
          items: [
            ...cartItems
          ]
        })

    }, [])

    useEffect(() => {
        const tmpSum:number = cartItems.reduce((acc, cur) => {
            return acc + ( (cur?.course?.redeemedPrice ?? cur?.course?.price) * cur.quantity )
        }, 0)
        setCartSum(tmpSum)
    }, [cartItems])

    return (
        <div className="cart">
            
            { isModalOpen && <Modal close={handleModalClose}>
              <div className='cart-modal'>
                    <p className="cart-modal-header">RODO</p>
                    <p className="cart-modal-body">
                        Wyrażam zgodę na otrzymywanie od Recruitment 
                        International Consulting Group Sp. z o.o. (RICG) 
                        za pośrednictwem poczty e-mail zaproszeń, powiadomień 
                        i informacji przeznaczonych dla członków społeczności 
                        RICG, między innymi o otwartych spotkaniach, wydarzeniach,
                         szkoleniach i ofertach pracy.
                    </p>
                    <div className="cart-modal-actions">
                        <div className="cart-modal-actions-zgoda">
                            <p>Tak, wyrażam zgodę z <a className="cart-modal-actions-link" target="blank" href={contactInfo?.regulation?.data?.attributes?.url}>Regulaminem</a></p>
                            <input type="checkbox" onChange={() => { setIsAgreedReg(true) }}></input>
                        </div>
                        <div className="cart-modal-actions-zgoda">
                            <p>Tak, wyrażam zgodę z  <a className="cart-modal-actions-link" target="blank" href={contactInfo?.rodo?.data?.attributes?.url}>Regulaminem RODO</a></p>
                            <input type="checkbox" onChange={() => { setIsAgreedRodo(true) }}></input>
                        </div>
                        <div className="cart-modal-actions-buttons">
                            <div onClick={proceedToPayment} className={`cart-modal-actions-button ${ isAgreedReg && isAgreedRodo ? '' : 'button-disabled' }`}>
                                Przejdź do płatności
                            </div>
                            <div onClick={handleModalClose} className="cart-modal-actions-button">
                                Zamknij
                            </div>
                        </div>
                    </div>
              </div>
            </Modal> }

            <NavBar/>
            <div className="cart-wrapper">
                <div className="cart-wrapper-products">
                    <div className="cart-wrapper-products-header">Produkty</div>
                    <div className="cart-wrapper-products-wrapper">
                        { cartItems.map((item, key) => {
                            return (
                                <div>
                                    <HorizontalCourseCard item={item} index={key}/>
                                </div>
                            )
                        }) }
                    </div>
                </div>
                <div className="cart-wrapper-summary">
                    Podsumowanie koszyka: 
                    <div className="cart-wrapper-summary-sum">
                        <p className="cart-wrapper-summary-sum-label">Kwota:</p>
                        <p className="cart-wrapper-summary-sum-value">{cartSum} zł</p>
                    </div>
                    <div className={`cart-wrapper-summary-button ${cartItems.every((item) => item.quantity) && cartItems.length > 0 && cartSum > 0 ? 'button-active' : 'button-disabled' }`} onClick={() => {if (cartItems.length > 0) setIsModalOpen(true)}}>   
                        Przejdź do płatności
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Cart