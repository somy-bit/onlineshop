import React, { useRef } from 'react'
import Link from 'next/link'
import { FaAngleLeft, FaMinus, FaPlus, FaShoppingBasket } from "react-icons/fa";
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContetx';
import { urlFor } from '../lib/client'



const Cart = () => {

    const cartRef = useRef();

    // const handleCheckout = async()=>{

    //     // const stripe = await getStripe();
    //     // const response = await fetch('/api/stripe',{
    //     //     method:'POST',
    //     //     headers:{
    //     //         'Content-Type':'application/json'
    //     //     },
    //     //     body:JSON.stringify(cartItems)

    //     // })

    //     // if(response.status==500) return;
    //     // const data = await response.json();
    //     // toast.loading('redirecting..');

    //     // stripe.redirectToCheckout({sessionId:data.id});

        

    // }

    const sendToRegister =(e)=>{
        setShowCart(false)
    }

    const { totalQuantity, totalPrice, cartItems, 
        setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();
    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button
                    type='button'
                    className='cart-heading'
                    onClick={() => setShowCart(false)}
                >
                    <FaAngleLeft />
                    <span className='heading'>your cart</span>
                    <span className='cart-num-items'>({totalQuantity} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart flex flex-col items-center'>
                        <FaShoppingBasket size={150} />
                        <h3 > your basket is empty</h3>
                        <Link href='/'>
                            <button
                                className='btn'
                                type='button'
                                onClick={() => setShowCart(false)}
                            >continue shopping</button>
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
                                        <p>remove item</p>
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
                            <h3>SubTotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                            <button 
                            className='btn' 
                            type='button'
                            onClick={sendToRegister}
                            >
                            <Link href='/registerOrder'>register your purchase</Link></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart
