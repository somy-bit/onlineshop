import React, { useRef } from 'react'
import Link from 'next/link'
import { FaAngleLeft, FaMinus, FaPlus, FaShoppingBasket } from "react-icons/fa";
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContetx';
import { urlFor } from '../lib/client'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { strings } from '@/strings';

const Cart = () => {

    const cartRef = useRef();
    const router  = useRouter();

    const { totalQuantity, totalPrice, cartItems, 
        setShowCart, toggleCartItemQuantity, onRemove,user,lang} = useStateContext();


    const sendToRegister =(e)=>{
        setShowCart(false)
        if(!user){
            toast.error(strings.LOGIN_PLS_MSG[lang])
        }else{
            router.push('/registerOrder')
        }
    }

   
    return (
        <div className='cart-wrapper ' ref={cartRef}>
            <div className='cart-container pr-2'>
                <button
                    type='button'
                    className='flex items-center text-[18px] font-semibold cursor-pointer spaxe-x-2 ml-3 bg-transparent'
                    onClick={() => setShowCart(false)}
                >
                    <FaAngleLeft />
                    <span className='ml-3'>{strings.BASKET_LBL[lang]}</span>
                    <span className='ml-3 text-red-600'>({totalQuantity} {strings.ITEM_LBL[lang]})</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='m-[40px] text-center flex flex-col items-center'>
                        <FaShoppingBasket size={150} />
                        <h3 >{strings.EMPTY_BASKET[lang]}</h3>
                        <Link href='/'>
                            <button
                                className='btn'
                                type='button'
                                onClick={() => setShowCart(false)}
                            >{strings.CONTINUE_SHOP[lang]}</button>
                        </Link>
                    </div>
                )}

                <div className='mt-[15px] overflow-auto max-h-[70vh] px-4 py-3'>
                    {cartItems.length >= 1 && cartItems.map((item, index) => (
                        <div className='flex space-x-3 space-y-5 p-4' key={item._id}>
                            <img
                                src={urlFor(item?.product_image[0])}
                                className='w-[160px] h-[140px] rounded-lg bg-slate-100'
                            />
                            <div className='item-desc'>
                                <div className='flex justify-between w-[350px] text-gray-600 text-sm flex-wrap space-x-4-space-y-4'>
                                    <h5>{lang=='du'?item.product_name:(lang=='ar'?item.arabic_name:item.persian_name)}</h5>
                                    <h4>€{item.in_sale?item.off_price:item.price}</h4>
                                </div>
                                <div className='flex justify-between w-[350px] text-gray-600  buttom'>
                                    <div className=' w-[350px] '>
                                        <p className='grid grid-cols-3 mx-auto mt-3 w-[100px] ml-2 border border-gray-400 p-0'>
                                            <span className='text-[16px] px-1 py-1 cursor-pointer border border-gray-400 text-red-500' onClick={()=>toggleCartItemQuantity(item._id,'dec')}>
                                                <FaMinus />
                                            </span>
                                            <span className=' px-1 py-1  bg-blue-300 cursor-pointer border-r border-gray-400 text-[20px]' >
                                                {item.quantity}
                                            </span>
                                            <span className='text-[16px]  px-1 py-1 cursor-pointer text-green-500' onClick={()=>toggleCartItemQuantity(item._id,'inc')}>
                                                <FaPlus />
                                            </span>
                                        </p>
                                    </div>

                                </div>
                                <div className='flex flex-1 justify-center p-4 items-center text-red-400'>
                                    <>
                                    <button
                                        type='button'
                                        className='flex flex-row justify-between items-center text-lg  '
                                        onClick={()=>onRemove(item)}>
                                        <TiDeleteOutline />
                                        <p className='text-xs md:text-md'>{strings.DEL_ITEM[lang]}</p>
                                    </button>
                                    </>
                                </div>
                              
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >=1 && (
                    <div className='absolute bottom-0 right-0 w-full  px-4 py-5 bg-white'>
                        <div className='flex justify-between'>
                            <h3>{strings.TOTAL[lang]}</h3>
                            <h3>€{totalPrice}</h3>
                        </div>
                        <div className='flex flex-row justify-center items-center '>
                            <button 
                            className='btn' 
                            type='button'
                            onClick={sendToRegister}
                            >
                          {strings.REG_CART[lang]}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart
