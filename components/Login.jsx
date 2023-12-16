
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContetx';
import Link from 'next/link';

const Login = () => {

    const router = useRouter();

    const { setUser } = useStateContext();

    const login = async (e) => {
        e.preventDefault();



        const res = await fetch('/api/loginApi', {
            method: "POST",
            body: JSON.stringify({
                email: userName,
                password: password
            })
        });
        const data = await res.json();

        if (res.status == '200') {

            setUser(data.user[0])
            router.replace('/');
            console.log(data.user);

        } else if (res.status == '500') {
            toast.error(data.msg)
        }

    }

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState('admin');
    const [secretKey, setSecretKey] = useState('')


    return (
        <div className='flex flex-col h-[650px] pt-3 space-y-6 w-full max-w-2xl mx-auto  justify-center items-center '>
           
                <Link href='/'>
                    <img src='/images/logo.jpeg' className='cursor-pointer w-36 h-36' />
                </Link>
                <h1 className='font-semibold text-xl text-gray-700'>Log In :</h1>
           
            <form className='w-3/4  p-10 space-y-4 rounded-xl  bg-gray-200 shadow-lg '>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>Voer uw e-mail adres in:</label>
                    <input type='text' className='p-3 border-gray-300 rounded-lg' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='e-mail..' />
                </div>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>Wachtwoord:</label>
                    <input type='password' className='p-3 border-gray-300 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='wachtwoord..' />
                </div>
                {userType === 'admin' &&
                    <div className='flex flex-col justify-start space-y-2'>
                        <label>geheime sleutel voor beheerder:</label>
                        <input type='text' className='p-3 border-gray-300 rounded-lg' value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder='uw beheerderssleutel ...' />

                    </div>}
                <button className='text-white font-semibold uppercase bg-red-500 rounded-xl w-full py-2' type='button' onClick={(e) => login(e)}>Aanmelden</button>

                <div className=''>
                    <label className='text-gray-400 text-sm mr-2'>beheerder : </label>
                    <input type='radio' value='admin' checked={userType === 'admin'} onChange={(e) => setUserType(e.target.value)} />
                    <label className='ml-10 text-gray-400 text-sm mr-2' >Gebruiker : </label>
                    <input className='' type='radio' value='user' checked={userType === 'user'} onChange={(e) => setUserType(e.target.value)} />
                </div>

            </form>
            <div className='flex flex-row items-center space-x-2'><p className='text-sm text-gray-600'>heb je geen account? </p><Link href='/registerNewUser'><p className='text-green-400 font-semibold cursor-pointer'>aanmelden</p></Link></div>
        </div>

    )
}

export default Login
