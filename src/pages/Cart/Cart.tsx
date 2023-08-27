import { useSelector } from "react-redux"
import { AppState } from "../../store/store"
import NavBar from "../../components/header/navBar/NavBar"
import Footer from "../../components/footer/Footer"
import './cart.scss'
import HorizontalCourseCard from "../../components/horizontalCourseCard/HorizontalCourseCard"
import { useEffect, useState } from "react"
import { checkOutProductsFromCart } from "../../utils/hooks/usePayment"

const Cart = () => {
    
    const cartItems = useSelector((state:AppState) => state.cart.items);
    const [ cartSum, setCartSum ] = useState<number>(0)

    const proceedToPayment = () => {
        checkOutProductsFromCart(cartItems)
    }


    useEffect(() => {
        const tmpSum:number = cartItems.reduce((acc, cur) => {
            console.log(cur)
            return acc + cur?.course?.price
        }, 0)
        setCartSum(tmpSum)
    }, [cartItems])

    return (
        <div className="cart">
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
                    <div className={`cart-wrapper-summary-button ${ cartItems.length > 0 ? 'button-active' : 'button-disabled' }`} onClick={proceedToPayment}>   
                        Przedz do płatności
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Cart