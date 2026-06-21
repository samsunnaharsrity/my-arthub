import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PRICING_ID = {
    'user_pro' : 'price_1Tks2FPcDzrjf4zZxYfurtvb',
    'user_premium' : 'price_1TkrNePcDzrjf4zZ8A3LDSXE'
}