
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContetx';
import Link from 'next/link';

const Login = () => {

    const router = useRouter();

    const { setUser,setAdmin,lang } = useStateContext();

    const login = async (e) => {
        e.preventDefault();

        if (userType == 'user') {

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
                toast.error(lang=='du'?data.msg_du:(lang=='ar'?data.msg_ar:data.msg_fa), { duration: 4000 })
            }
        }else if(userType == 'admin'){

            const res = await fetch('/api/adminlogin', {
                method: "POST",
                body: JSON.stringify({
                    name: userName,
                    password: password,
                    secret_key:secretKey
                })
            });
            const data = await res.json();

            if (res.status == '200') {

                
                setAdmin(data.user[0])
                router.replace('/admin');
                console.log(data.user);

            } else if (res.status == '500') {
                toast.error(lang=='du'?data.msg_du:(lang=='ar'?data.msg_ar:data.msg_fa), { duration: 4000 })
            }

        }

    }

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState('user');
    const [secretKey, setSecretKey] = useState('')


    return (
        <div className='flex flex-col h-[650px] pt-3 space-y-6 w-full mx-auto  justify-center items-center '>

            <Link href='/'>
                <img src='/images/logo.jpeg' className='cursor-pointer w-36 h-36' />
            </Link>
            <h1 className='font-semibold text-xl text-gray-700 mb-5'>{lang=='du'?'Log In :':(lang=='ar'?'تسجيل الدخول':'وارد شدن')}</h1>

            <form className='w-full  p-5 max-w-2xl space-y-4 rounded-xl  bg-gray-200 shadow-lg '>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>{lang=='du'?'Voer uw e-mail adres in:':(lang=='ar'?'أدخل عنوان بريدك الالكتروني:':'آدرس ایمیل خود را وارد کنید:')}</label>
                    <input type='text' className='p-3 border-gray-300 rounded-lg' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder={lang=='du'?'e-mail..':(lang=='ar'?'بريد إلكتروني ..':'پست الکترونیک ..')} />
                </div>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>{lang=='du'?'Wachtwoord:':(lang=='ar'?'كلمة المرور':'کلمه عبور')}</label>
                    <input type='password' className='p-3 border-gray-300 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={lang=='du'?'wachtwoord..':(lang=='ar'?'كلمة المرور':'کلمه عبور')} />
                </div>
                {userType === 'admin' &&
                    <div className='flex flex-col justify-start space-y-2'>
                        <label>{lang=='du'?'geheime sleutel voor beheerder:':(lang=='ar'?'المفتاح السري للمسؤول:':'کلید مخفی برای مدیر:')}</label>
                        <input type='text' className='p-3 border-gray-300 rounded-lg' value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder={lang=='du'?'jouw geheime sleutel...':(lang=='ar'?'ممفتاحك السري...':'کلید مخفی شما...')} />

                    </div>}
                <button className='text-white font-semibold uppercase bg-red-500 rounded-xl w-full py-2' type='button' onClick={(e) => login(e)}>{lang=='du'?'Inloggen':(lang=='ar'?'تسجيل الدخول':'ورود')}</button>

                <div className=''>
                    <label className='text-gray-400 text-xs mr-1'>{lang=='du'?'beheerder':(lang=='ar'?'مسؤل':'مدیر')}</label>
                    <input type='radio' value='admin' checked={userType === 'admin'} onChange={(e) => setUserType(e.target.value)} />
                    <label className='ml-10 text-gray-400 text-xs mr-1' >{lang=='du'?'gebruiker':(lang=='ar'?'مستخدم':'کاربر')}</label>
                    <input className='' type='radio' value='user' checked={userType === 'user'} onChange={(e) => setUserType(e.target.value)} />
                </div>

            </form>
            <div className='flex flex-row items-center space-x-2 my-5'><p className='text-sm text-gray-600'>{lang=='du'?'heb je geen account?':(lang=='ar'?'ليس لديك حساب؟':'حساب کاربری ندارید؟')}</p><Link href='/registerNewUser'><p className='text-green-400 font-semibold cursor-pointer'>{lang=='du'?'aanmelden':(lang=='ar'?'اشتراك':'ثبت نام')}</p></Link></div>
        </div>

    )
}

export default Login
