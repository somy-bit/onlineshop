import React, { useState } from 'react'

const login = () => {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState('admin');
    const [secretKey,setSecretKey] =useState('')


    return (
        <div className='flex h-[650px] w-full  justify-center items-center'>
            <form className='w-3/4  p-10 space-y-4 rounded-xl  bg-gray-200 shadow-lg '>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>UserName:</label>
                    <input type='text' className='p-3 border-gray-300 rounded-lg' value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder='username..' />
                </div>
                <div className='flex flex-col justify-start space-y-2'>
                    <label>Password:</label>
                    <input type='text' className='p-3 border-gray-300 rounded-lg' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password..' />
                </div>
                {userType === 'admin' &&
                    <div  className='flex flex-col justify-start space-y-2'>
                        <label>secret key for admin :</label>
                        <input type='text' className='p-3 border-gray-300 rounded-lg' value={secretKey} onChange={(e)=>setSecretKey(e.target.value)} placeholder='your admin key ...' />

                    </div>}
                <button className='text-white font-semibold uppercase bg-red-500 rounded-xl w-full py-2' type='button' onClick={null}>Sign In</button>

                <div className=''>
                    <label className='text-gray-400 text-sm mr-2'>Admin : </label>
                    <input type='radio' value='admin' checked={userType === 'admin'} onChange={(e) => setUserType(e.target.value)} />
                    <label className='ml-10 text-gray-400 text-sm mr-2' >User : </label>
                    <input className='' type='radio' value='user' checked={userType === 'user'} onChange={(e) => setUserType(e.target.value)} />
                </div>
            </form>
        </div>

    )
}

export default login
