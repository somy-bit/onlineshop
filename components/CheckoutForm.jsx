import React from 'react'
import { UserForm } from '.';
import { useStateContext } from '../context/StateContetx';
import { strings } from '../strings';

const CheckoutForm = () => {
  

    const { cartItems, totalPrice,lang } = useStateContext();
    return (
        <div className='w-full px-1  sm:max-w-2xl mx-auto space-x-4'>
               <div className=' bg-red-400 mb-10 rounded-md text-white w-full ' >
      
      <img src='/images/footer.jpeg' alt='footer banner'/>
     
    </div>
            <h2 className='text-center text-green-900 font-semibold mb-8'>{strings.BILL_LBL[lang]}</h2>
            <div className='grid grid-cols-4 p-4  border-b-2 border-gray-500 mx-auto text-center  '>
                <div className='overflow-hidden'>{strings.PRODUCTS_LBL[lang]}</div>
                <div className='overflow-hidden'>{strings.QTY[lang]}</div>
                <div className='overflow-hidden'>{strings.PRICE_LBL[lang]}</div>
                <div className='overflow-hidden'>{strings.TOTAL_PRICE_LBL[lang]}</div>
            </div>
            {
                cartItems?.map((item,i) => (
                    <div key={i} className='grid grid-cols-4 p-4  border-b-2 border-gray-300 mx-auto text-center  '>
                        <div>{lang=='du'?item.product_name:(lang=='ar'?item.arabic_name:item.persian_name)}</div>
                        <div>{item.quantity}</div>
                        <div>{item.in_sale?item.off_price:item.price}</div>
                        <div>{(Math.round((item.in_sale?item.off_price:item.price)* item.quantity*100)/100).toFixed(2)}</div>
                    </div>
                ))
            }

            <div className='mx-auto mt-10 p-4 text-center text-white bg-green-600 rounded-lg'>
                <h1>{strings.PAYMENT_LBL[lang]}</h1>
                <p className='text-lg text-gray-900 font-semibold'>€{totalPrice}</p>
            </div>
            <div className='mt-10 space-y-8'>
                <h2 className='tetx-lg text-green-900 font-semibold'>{strings.ADRES_CONFIRM_LBL[lang]}</h2>
                <UserForm />
            </div>
            <div className='mx-auto p-4 flex items-center justify-center '>
            </div>

        </div>

    )
}

export default CheckoutForm
