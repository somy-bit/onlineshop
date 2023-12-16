import React, { useState } from 'react'
import { useStateContext } from '../context/StateContetx'
import toast from 'react-hot-toast';
import {useRouter} from 'next/router';

const UserForm = () => {
   

    const { cartItems, totalPrice , setCartItems ,setTotalPrice} = useStateContext();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [block, setBlock] = useState('');
    const [no, setNo] = useState('');


    const router = useRouter();

    const sendData = async (e) => {
        e.preventDefault();

        let customer = {
            name: name,
            phone: phone,
            email: email,
            address: {
                city: city, street: street, block: block, no: no
            }

        }
        let newOrder = cartItems.map((item) => (
            { product_name: item.product_name, price: item.price, qty: item.quantity }
        ))

        const res = await fetch("/api/createOrder", {
            method: "POST",
            body: JSON.stringify(
                {
                    order: newOrder,
                    total: totalPrice,
                    customer: customer
                })
        });
        if(res.status == '200'){
            setName('');
            setEmail('');
            setPhone('');
            setBlock('');
            setCity('');
            setNo('');
            setStreet('');
            setCartItems([]);
            setTotalPrice(0);
            router.replace('/success')
        }
        

    }


    return (
        <form className='flex flex-col items-center justify-center'>
            <input type='text' placeholder='your name..' value={name} onChange={(e) => setName(e.target.value)} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='number' placeholder='your PhoneNumber..' onChange={(e) => setPhone(e.target.value)} value={phone} className=' border-b-2 w-full border-blue-300 p-3' required />
            <input type='email' placeholder='your email address..' onChange={(e) => setEmail(e.target.value)} value={email} className='border-b-2 w-full border-blue-300 p-3' />
            <input type='text' placeholder='your city..' onChange={(e) => setCity(e.target.value)} value={city} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='your street..' onChange={(e) => setStreet(e.target.value)} value={street} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='your block..' onChange={(e) => setBlock(e.target.value)} value={block} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='your door number..' onChange={(e) => setNo(e.target.value)} value={no} className='border-b-2 w-full border-blue-300 p-3' required />
            <button className='btn'  onClick={(e)=>sendData(e)}>Purchase</button>

        </form>
    )
}

export default UserForm
