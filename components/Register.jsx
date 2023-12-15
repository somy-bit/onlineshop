import React, { useState } from 'react'
import router from 'next/router';
import toast from 'react-hot-toast';

const Register = () => {


        const [userName, setUserName] = useState('');
        const [password, setPassword] = useState('');
        const [userType, setUserType] = useState('user');
        const [secretKey, setSecretKey] = useState('')
        const [email, setEmail] = useState('')
        const [phone, setPhone] = useState('')
        const [city, setCity] = useState('')
        const [street, setStreet] = useState('')
        const [block, setBlock] = useState('')
        const [no, setNo] = useState('')
        const [data, setData] = useState(null)
    
    
    
        const registerUser = async () => {
    
            let address = {
                city: city,
                street: street,
                block: block,
                no: no
            }
    
            let newUser = {
    
                name: userName,
                user_type: userType,
                password: password,
                phone: phone,
                email: email,
                address: address,
            }
    
    
            router.replace('/success')
            if (userType === 'user') {
    
                const res = await fetch('/api/createUser', {
                    method: 'POST',
                    body: JSON.stringify(newUser),
                });
    
                const dat = await res.json();
               alert('it works')
    
    
            }
        }
    
    
    
        return (
            <div className='flex mt-12 mb-32 w-full  justify-center items-center '>
                {/* {checks && checks.map(i=>(<div>{i.email}</div>))} */}
                <form className='w-3/4  p-10 space-y-4 rounded-xl  bg-gray-200 max-w-2xl shadow-lg '>
                    <div className='flex flex-col justify-start space-y-2'>
                        <label>UserName:</label>
                        <input type='text' className='p-3 border-gray-300 rounded-lg' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='username..' />
                    </div>
                    <div className='flex flex-col justify-start space-y-2'>
                        <label>Password:</label>
                        <input type='text' className='p-3 border-gray-300 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password..' />
                    </div>
                    {userType === 'user' &&
                        <div className='space-y-4'>
                            <div className='flex flex-col justify-start space-y-2'>
                                <label>Email:</label>
                                <input type='text' className='p-3 border-gray-300 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email..' />
                            </div>
                            <div className='flex flex-col justify-start space-y-2'>
                                <label>Phone Number:</label>
                                <input type='text' className='p-3 border-gray-300 rounded-lg' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='phone number..' />
                            </div>
                            <div className='flex flex-col justify-start space-y-2'>
                                <label>Address Details:</label>
                                <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={city} onChange={(e) => setCity(e.target.value)} placeholder='your city name...' />
                                <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={street} onChange={(e) => setStreet(e.target.value)} placeholder='your street...' />
                                <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={block} onChange={(e) => setBlock(e.target.value)} placeholder='your block ...' />
                                <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={no} onChange={(e) => setNo(e.target.value)} placeholder='your door number..' />
    
                            </div>
                        </div>
                    }
                    {userType === 'admin' &&
                        <div className='flex flex-col justify-start space-y-2'>
                            <label>secret key for admin :</label>
                            <input type='text' className='p-3 border-gray-300 rounded-lg' value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder='your admin key ...' />
    
                        </div>}
                    <button className='text-white font-semibold uppercase bg-red-500 rounded-xl w-full py-2' type='button' onClick={()=>registerUser()}>Sign UP</button>
    
                    <div className=''>
                        <label className='text-gray-400 text-sm mr-2'>Admin : </label>
                        <input type='radio' value='admin' checked={userType === 'admin'} onChange={(e) => setUserType(e.target.value)} />
                        <label className='ml-10 text-gray-400 text-sm mr-2' >User : </label>
                        <input className='' type='radio' value='user' checked={userType === 'user'} onChange={(e) => setUserType(e.target.value)} />
                    </div>
                </form>
                {data && <h1 className='w-12 h-12 p-8 bg-red-600'>got data</h1>}
            </div>
    
        )
    }
    
   

export default Register
