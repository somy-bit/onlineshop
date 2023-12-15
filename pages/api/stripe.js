import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

//const stripe = require('stripe')('sk_test_51OMWvuABjE7gPeOB0Rs9i15Vus4NLlZOCpzzcwuEcO7nPpgiBw1nicxBML5ULhAlWeYBuAWQr6pvyx133hRpv5F300PY28kAJZ');

export default async function handler(req,res){


    if(req.method === 'POST'){
        console.log(req.body)
        try{
            const params = {
                 submit_type:'pay',
                 payment_method_types:['Cards'],
                 billing_address_collection:'auto',
                 
                line_items:[
                   
                    {
                        price:'{{PRICE_ID}}',
                        quantity:1
                    }
                ],
                mode:'payment',
                success_url:`${req.headers.origin}/success`,
                cancel_url:`${req.headers.origin}/canceled`,
            }

            const session = await stripe.checkout.sessions.create(params);
            res.redirect(303,session.url)
        }catch(error){
            res.status(error.statusCode || 500).json(error.message)
        }
    }else{
        res.setHeader('Allow','POST');
        res.status(405).end('Method Not Allowed')
    }
}