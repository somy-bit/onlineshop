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
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button
                    type='button'
                    className='cart-heading'
                    onClick={() => setShowCart(false)}
                >
                    <FaAngleLeft />
                    <span className='heading'>{strings.BASKET_LBL[lang]}</span>
                    <span className='cart-num-items'>({totalQuantity} {strings.ITEM_LBL[lang]})</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart flex flex-col items-center'>
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

                <div className='product-container'>
                    {cartItems.length >= 1 && cartItems.map((item, index) => (
                        <div className='product' key={item._id}>
                            <img
                                src={urlFor(item?.product_image[0])}
                                className='cart-product-image'
                            />
                            <div className='item-desc'>
                                <div className='flex  top'>
                                    <h5>{lang=='du'?item.product_name:(lang=='ar'?item.arabic_name:item.persian_name)}</h5>
                                    <h4>€{item.price}</h4>
                                </div>
                                <div className='flex buttom'>
                                    <div>
                                        <p className='flex flex-row mt-3 quantity-desc'>
                                            <span className='minus' onClick={()=>toggleCartItemQuantity(item._id,'dec')}>
                                                <FaMinus />
                                            </span>
                                            <span className='num' >
                                                {item.quantity}
                                            </span>
                                            <span className='plus' onClick={()=>toggleCartItemQuantity(item._id,'inc')}>
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
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3>{strings.TOTAL[lang]}</h3>
                            <h3>€{totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
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
