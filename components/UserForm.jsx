import React, { useState,useRef } from 'react'
import { useStateContext } from '../context/StateContetx'
import {useRouter} from 'next/router';
import emailjs from '@emailjs/browser';

const UserForm = () => {
   
const form =useRef();
    const { cartItems, totalPrice ,user,lang} = useStateContext();
    const [name, setName] = useState(user?.name);
    const [phone, setPhone] = useState(user?.phone);
    const [email, setEmail] = useState(user?.email);
    const [city, setCity] = useState(user?.address.city);
    const [street, setStreet] = useState(user?.address.street);
    const [block, setBlock] = useState(user?.address.block);
    const [no, setNo] = useState(user?.address.no);


    let summery = []
    cartItems.map(item=>{
        summery.push({product:item.product_name,quantity:item.quantity,total_price:item.price*item.quantity,id:item._id})
    })

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
            
            emailjs.sendForm('service_kdx5i13', 'template_6j2f2sw', form.current, '1KWcF4v2P_0sihTus')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            router.replace('/success')
        }
        

    }


    return (
        <form ref={form} className='flex flex-col items-center justify-center'>
            <input type='text' placeholder='uw naam..' value={name} name='name' onChange={(e) => setName(e.target.value)} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='number' name='phone' placeholder='jouw telefoon nummer..' onChange={(e) => setPhone(e.target.value)} value={phone} className=' border-b-2 w-full border-blue-300 p-3' required />
            <input type='email' placeholder='jouw e-mailadres..' name='email' onChange={(e) => setEmail(e.target.value)} value={email} className='border-b-2 w-full border-blue-300 p-3' />
            <input type='text' placeholder='Uw stad..' onChange={(e) => setCity(e.target.value)} value={city} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='jouw straat..' onChange={(e) => setStreet(e.target.value)} value={street} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='jouw blok..' onChange={(e) => setBlock(e.target.value)} value={block} className='border-b-2 w-full border-blue-300 p-3' required />
            <input type='text' placeholder='andere details..' onChange={(e) => setNo(e.target.value)} value={no} className='border-b-2 w-full border-blue-300 p-3' required />
            <button className='btn'  onClick={(e)=>sendData(e)}>{lang=='du'?'ANKOOP':(lang=='ar'?'':'بخر')}</button>
{
    summery?.map((item)=>(
        
        <input key={item.id} type='hidden' name='product' value={JSON.stringify(item)}/>

        
    ))
}
        </form>
    )
}

export default UserForm
