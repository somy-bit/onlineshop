import React, { useState } from 'react'
import { useStateContext } from '../context/StateContetx'
import {useRouter} from 'next/router';

const UserForm = () => {
   

    const { cartItems, totalPrice , setCartItems ,setTotalPrice ,user} = useStateContext();
    const [name, setName] = useState(user?.name);
    const [phone, setPhone] = useState(user?.phone);
    const [email, setEmail] = useState(user?.email);
    const [city, setCity] = useState(user?.address.city);
    const [street, setStreet] = useState(user?.address.street);
    const [block, setBlock] = useState(user?.address.block);
    const [no, setNo] = useState(user?.address.no);


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
            { product_name: item.product_name, price: item.price, qty: item.quantity,_key:item._id }
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
            <input type='text' placeholder='uw naam..' value={name} onChange={(e) => setName(e.target.value)} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='number' placeholder='jouw telefoon nummer..' onChange={(e) => setPhone(e.target.value)} value={phone} className=' border-b-2 w-full border-blue-300 p-3' required />
            <input type='email' placeholder='jouw e-mailadres..' onChange={(e) => setEmail(e.target.value)} value={email} className='border-b-2 w-full border-blue-300 p-3' />
            <input type='text' placeholder='Uw stad..' onChange={(e) => setCity(e.target.value)} value={city} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='jouw straat..' onChange={(e) => setStreet(e.target.value)} value={street} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='jouw blok..' onChange={(e) => setBlock(e.target.value)} value={block} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='andere details..' onChange={(e) => setNo(e.target.value)} value={no} className='border-b-2 w-full border-blue-300 p-3' required />
            <button className='btn'  onClick={(e)=>sendData(e)}>Aankoop</button>

        </form>
    )
}

export default UserForm
