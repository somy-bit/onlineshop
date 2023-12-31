import React, { useState } from 'react'
import router from 'next/router';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContetx';
import Link from 'next/link';
import { strings } from '../strings';

 
const Register = () => {

    const { user, setUser,lang } = useStateContext();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user');

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
            email: email.toLowerCase(),
            address: address,
        }



        if (userType === 'user') {

            const res = await fetch('/api/createUser', {
                method: 'POST',
                body: JSON.stringify(newUser),
            });
            
            const dat = await res.json();
            setIsReg(false)
            toast.success(dat.msg[lang],{duration:3000})
            if (res.status == '200') {
                setUser({ ...newUser, _id: dat.id });
                router.replace('/')
            }
        }
    }



    return (
        <div className='flex flex-col space-y-6 mt-12 mb-32 w-full mx-auto  justify-center items-center '>
              <Link href='/'>
                    <img src='/images/logo.jpeg' alt='logo' className='cursor-pointer w-36 h-36' />
                </Link>
                <h1 className='font-semibold text-xl text-gray-700'>{strings.SIGN_UP[lang]}:</h1>
            <form className='w-full  p-5 max-w-2xl space-y-4 rounded-xl  bg-gray-200 shadow-lg '>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>{strings.FULL_NAME[lang]} :</label>
                    <input type='text' className='p-3 border-gray-300 rounded-lg' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder={strings.FULL_NAME[lang]+'...'}/>
                </div>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>{strings.CREATE_PASS_LABEL[lang]} :</label>
                    <input type='password' className='p-3 border-gray-300 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={strings.PASSWRD[lang]+'...'} />
                </div>
                
                    <div className='space-y-4'>
                        <div className='flex flex-col justify-start space-y-2'>
                            <label>{strings.ENTER_EMAIL_LABEL[lang]} :</label>
                            <input type='text' className='p-3 border-gray-300 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={strings.EMAIL[lang]+'...'} />
                        </div>
                        <div className='flex flex-col justify-start space-y-2'>
                            <label>{strings.TEL_NO_LABEL[lang]} :</label>
                            <input type='text' className='p-3 border-gray-300 rounded-lg' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={strings.TEL_NO_LABEL[lang]+'...'} />
                        </div>
                        <div className='flex flex-col justify-start space-y-2'>
                            <label>{strings.ADDRESS_LABEL[lang]} :</label>
                            <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={city} onChange={(e) => setCity(e.target.value)} placeholder={strings.CITY_LBL[lang]+'...'} />
                            <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={street} onChange={(e) => setStreet(e.target.value)} placeholder={strings.STREET_LBL[lang]+'...'} />
                            <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={block} onChange={(e) => setBlock(e.target.value)} placeholder={strings.BLK_LBL[lang]+'...'} />
                            <input type='text' className='p-2 bg-gray-300  shadow-lg rounded-md' value={no} onChange={(e) => setNo(e.target.value)} placeholder={strings.REST_ADD_LBL[lang]+'...'} />

                        </div>
                    </div>
  
                <button className='text-white font-semibold uppercase bg-red-500 rounded-xl w-full py-2' type='button' disabled={isReg} onClick={(e) => registerUser(e)}>{strings.SIGN_UP[lang]}</button>

            </form>
            <div className='flex flex-row items-center space-x-2 my-5'><p className='text-sm text-gray-600'>{strings.HAVE_ACC_QSTN[lang]} ? </p><Link href='/login'><p className='text-green-400 font-semibold cursor-pointer'>{strings.LOG_HERE[lang]} </p></Link></div>


        </div>

    )
}



export default Register
