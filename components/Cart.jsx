import React, { useRef } from 'react'
import Link from 'next/link'
import { FaAngleLeft, FaMinus, FaPlus, FaShoppingBasket } from "react-icons/fa";
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContetx';
import { urlFor } from '../lib/client'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Cart = () => {

    const cartRef = useRef();
    const router  = useRouter();


    const sendToRegister =(e)=>{
        setShowCart(false)
        if(!user){
            toast.error('please log in to continue shopping',4000)
        }else{
            router.push('/registerOrder')
        }
    }

    const { totalQuantity, totalPrice, cartItems, 
        setShowCart, toggleCartItemQuantity, onRemove,user,lang} = useStateContext();
    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button
                    type='button'
                    className='cart-heading'
                    onClick={() => setShowCart(false)}
                >
                    <FaAngleLeft />
                    <span className='heading'>{lang=='du'?'jouw winkelwagen':(lang=='ar'?'سلة التسوق الخاصة بك':'سبد خرید شما')}</span>
                    <span className='cart-num-items'>({totalQuantity} {lang=='du'?'item':(lang=='ar'?'مادة':'مورد')})</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart flex flex-col items-center'>
                        <FaShoppingBasket size={150} />
                        <h3 >{lang=='du'?'Jouw mandje is leeg':(lang=='ar'?'سلتك فارغة':'سبد شما خالی است')}</h3>
                        <Link href='/'>
                            <button
                                className='btn'
                                type='button'
                                onClick={() => setShowCart(false)}
                            >{lang=='du'?'doorgaan met winkelen':(lang=='ar'?'مواصلة التسوق':'ادامه خرید')}</button>
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
                                    <h5>{item.product_name}</h5>
                                    <h4>${item.price}</h4>
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
                                        <p>{lang=='du'?'verwijder het artikel':(lang=='ar'?'احذف العنصر':'مورد را حذف کنید')}</p>
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
                            <h3>{lang=='du'?'totaal :':(lang=='ar'?' المجموع :':'جمع :')}</h3>
                            <h3>€{totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                            <button 
                            className='btn' 
                            type='button'
                            onClick={sendToRegister}
                            >
                          {lang=='du'?'registreer uw aankoop':(lang=='ar'?'سجل عملية الشراء الخاصة بك':'خرید خود را ثبت کنید')}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart
