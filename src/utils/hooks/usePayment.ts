import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export const createPayment = async (id: string, title: string, price: number) => {
    try {
        const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_LIVE || '');
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