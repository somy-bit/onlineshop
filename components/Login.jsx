
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContetx';
import Link from 'next/link';
import { strings } from '../strings';



const Login = () => {

    const router = useRouter();

    const { setUser,lang } = useStateContext();


    const login = async (e) => {
        e.preventDefault();

        

            const res = await fetch('/api/loginApi', {
                method: "POST",
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    password: password
                })
            });
            const data = await res.json();

            if (res.status == '200') {

                setUser(data.user[0])
                router.replace('/');
                console.log(data.user);

            } else if (res.status == '500') {
                toast.error(data.msg[lang], { duration: 4000 })
            }
     
    }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
   


    return (
        <div className='flex flex-col h-[650px] pt-3 space-y-6 w-full mx-auto  justify-center items-center '>

            <Link href='/'>
                <img src='/images/logo.jpeg' className='cursor-pointer w-36 h-36' />
            </Link>
            <h1 className='font-semibold text-xl text-gray-700 mb-5'>{strings.LOGIN[lang]}</h1>

            <form className='w-full  p-5 max-w-2xl space-y-4 rounded-xl  bg-gray-200 shadow-lg '>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>{strings.ENTER_EMAIL_LABEL[lang]} :</label>
                    <input type='text' className='p-3 border-gray-300 rounded-lg' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={strings.EMAIL[lang]+'...'} />
                </div>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>{strings.ENTER_PASS_LABEL[lang]} :</label>
                    <input type='password' className='p-3 border-gray-300 rounded-lg' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={strings.PASSWRD[lang]+'...'} />
                </div>
               
              
                <button className='text-white font-semibold uppercase bg-red-500 rounded-xl w-full py-2' type='button' onClick={e=>login(e)}>{strings.LOGIN[lang]}</button>


            </form>
            <div className='flex flex-row items-center space-x-2 my-5'><p className='text-sm text-gray-600'>{strings.NOT_HAV_ACC_QSTN[lang]} ?</p><Link href='/registerNewUser'><p className='text-green-400 font-semibold cursor-pointer'>{strings.REG_HERE[lang]}</p></Link></div>
        </div>

    )
}

export default Login
