import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export const createPayment = async (id: string, title: string, price: number) => {
    try {
        const stripePromise = loadStripe('pk_test_51N6g4qAxQ1CFxjjOkikYlfumtOZyWVyImkVvsRO9HBEX2ux2j4NltR7qXB26oET7kMS0I02qdU0vzTOMsV56ZxXS00TZQApF0E' || '');
        const stripe = await stripePromise;

          const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, {
            products: [ { id, title, price } ],
          })

          await stripe?.redirectToCheckout({
            sessionId: res.data.stripeSession.id
          })

      } catch(err) {
        console.log(err);
      }
}

export const checkOutProductsFromCart = async (items:Array<any>) => {
  try {
    const stripePromise = loadStripe('pk_test_51N6g4qAxQ1CFxjjOkikYlfumtOZyWVyImkVvsRO9HBEX2ux2j4NltR7qXB26oET7kMS0I02qdU0vzTOMsV56ZxXS00TZQApF0E' || '');
    const stripe = await stripePromise;

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, {
      products: [ ...items ],
    })

    await stripe?.redirectToCheckout({
      sessionId: res.data.stripeSession.id
    })

  } catch (err) {
    console.error(err);
  }
}