import React from 'react'
import { UserForm } from '.';
import { useStateContext } from '../context/StateContetx';

const CheckoutForm = () => {
  

    const { cartItems, totalPrice } = useStateContext();
    return (
        <div className='p-8 space-x-4'>
            <h2 className='text-center text-green-900 font-semibold mb-8'>your check</h2>
            <div className='grid grid-cols-4 p-4  border-b-2 border-gray-500 mx-auto text-center  '>
                <div>products</div>
                <div>quantity</div>
                <div>single price</div>
                <div>total price</div>
            </div>
            {
                cartItems?.map((item,i) => (
                    <div key={i} className='grid grid-cols-4 p-4  border-b-2 border-gray-300 mx-auto text-center  '>
                        <div>{item.product_name}</div>
                        <div>{item.quantity}</div>
                        <div>{item.price}</div>
                        <div>{item.price * item.quantity}</div>
                    </div>
                ))
            }

            <div className='mx-auto mt-10 p-4 text-center text-white bg-green-600 rounded-lg'>
                <h1>total payment</h1>
                <p className='text-lg text-gray-900 font-semibold'>${totalPrice}</p>
            </div>
            <div className='mt-10 space-y-8'>
                <h2 className='tetx-lg text-green-900 font-semibold'>Enter Your Data :</h2>
                <UserForm />
            </div>
            <div className='mx-auto p-4 flex items-center justify-center '>
            </div>

        </div>

    )
}

export default CheckoutForm
