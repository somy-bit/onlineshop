import React, { useState } from 'react'
import router from 'next/router';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContetx';
import Link from 'next/link';

const Register = () => {

    const { user, setUser,lang } = useStateContext();

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
    const [isReg, setIsReg] = useState(false)





    const registerUser = async (e) => {

        e.preventDefault();
        setIsReg(true)

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



        if (userType === 'user') {

            const res = await fetch('/api/createUser', {
                method: 'POST',
                body: JSON.stringify(newUser),
            });
            
            const dat = await res.json();
            setIsReg(false)
            toast.success(lang=='du'?dat.msg_du:(lang=='ar'?dat.msg_ar:dat.msg_fa),{duration:3000})
            if (res.status == '200') {
                setUser({ ...newUser, _id: dat.id });
                router.replace('/')
            }
        }
    }



    return (
        <div className='flex flex-col space-y-6 mt-12 mb-32 w-full mx-auto  justify-center items-center '>
              <Link href='/'>
                    <img src='/images/logo.jpeg' className='cursor-pointer w-36 h-36' />
                </Link>
                <h1 className='font-semibold text-xl text-gray-700'>{lang=='du'?'aanmelden:':(lang=='ar'?'اشتراك':'ثبت نام')}</h1>
            <form className='w-full  p-5 max-w-2xl space-y-4 rounded-xl  bg-gray-200 shadow-lg '>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>{lang=='du'?'voor-en achternaam :':(lang=='ar'?'الاسم الكامل :':'نام و نام خانوادگی:')}</label>
                    <input type='text' className='p-3 border-gray-300 rounded-lg' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder={lang=='du'?'voor-en achternaam..':(lang=='ar'?'الاسم الكامل ..':'نام و نام خانوادگی ..')}/>
                </div>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>{lang=='du'?'wachtwoord:':(lang=='ar'?'كلمة المرور :':'کلمه عبور :')}</label>
                    <input type='password' className='p-3 border-gray-300 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={lang=='du'?'wachtwoord..':(lang=='ar'?'كلمة المرور ..':'کلمه عبور ..')} />
                </div>
                {userType === 'user' &&
                    <div className='space-y-4'>
                        <div className='flex flex-col justify-start space-y-2'>
                            <label>{lang=='du'?'E-mail :':(lang=='fa'?'پست الکترونیک:':'بريد إلكتروني:')}</label>
                            <input type='text' className='p-3 border-gray-300 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={lang=='du'?'E-mail..':(lang=='fa'?'پست الکترونیک..':'بريد إلكتروني..')} />
                        </div>
                        <div className='flex flex-col justify-start space-y-2'>
                            <label>{lang=='du'?'telefoonnummer :':(lang=='ar'?'رقم التليفون :':'شماره تلفن :')}</label>
                            <input type='text' className='p-3 border-gray-300 rounded-lg' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={lang=='du'?'telefoonnummer :':(lang=='ar'?'رقم التليفون :':'شماره تلفن :')} />
                        </div>
                        <div className='flex flex-col justify-start space-y-2'>
                            <label>{lang=='du'?'adresgegevens:':(lang=='ar'?'معلومات العنوان  :':'اطلاعات آدرس :')}</label>
                            <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={city} onChange={(e) => setCity(e.target.value)} placeholder={lang=='du'?'naam van je stad..':(lang=='ar'?'اسم مدينتك ..':'نام شهر شما..')} />
                            <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={street} onChange={(e) => setStreet(e.target.value)} placeholder={lang=='du'?'jouw straat..':(lang=='ar'?'شارعك ..':'خیابان..')} />
                            <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={block} onChange={(e) => setBlock(e.target.value)} placeholder={lang=='du'?'je bloknummer..':(lang=='ar'?'رقم الكتلة الخاص بك ..':'شماره بلوک شما..')} />
                            <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={no} onChange={(e) => setNo(e.target.value)} placeholder={lang=='du'?'de rest van uw adres':(lang=='ar'?'بقية عنوانك':'بقیه آدرس شما')} />

                        </div>
                    </div>
                }
                {userType === 'admin' &&
                    <div className='flex flex-col justify-start space-y-2'>
                        <label>{lang=='du'?'geheime sleutel voor beheerder :':(lang=='ar'?'المفتاح السري للمسؤول:':'کلید مخفی برای مدیر:')}</label>
                        <input type='text' className='p-3 border-gray-300 rounded-lg' value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder='your admin key ...' />

                    </div>}
                <button className='text-white font-semibold uppercase bg-red-500 rounded-xl w-full py-2' type='button' disabled={isReg} onClick={(e) => registerUser(e)}>{lang=='du'?'aanmelden':(lang=='ar'?'اشتراك':'ثبت نام')}</button>

                <div className=''>
                    <label className='text-gray-400 text-xs mr-1'>{lang=='du'?'beheerder':(lang=='ar'?'مسؤل':'مدیر')} </label>
                    <input type='radio' value='admin' checked={userType === 'admin'} onChange={(e) => setUserType(e.target.value)} />
                    <label className='ml-10 text-gray-400 text-xs mr-1' >{lang=='du'?'gebruiker':(lang=='ar'?'مستخدم':'کاربر')} </label>
                    <input className='' type='radio' value='user' checked={userType === 'user'} onChange={(e) => setUserType(e.target.value)} />
                </div>
            </form>
            <div className='flex flex-row items-center space-x-2 my-5'><p className='text-sm text-gray-600'>{lang=='du'?'Heeft u al een account?':(lang=='ar'?'هل لديك حساب بالفعل؟':'آیا از قبل حساب دارید؟')}  </p><Link href='/login'><p className='text-green-400 font-semibold cursor-pointer'>{lang=='du'?'Inloggen':(lang=='ar'?'تسجيل الدخول':'وارد شدن')} </p></Link></div>


        </div>

    )
}



export default Register
