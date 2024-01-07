import React from 'react'
import { client, urlFor } from "../../lib/client"
import { FiStar, FiPlus, FiMinus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Product } from "../../components";
import { useState } from 'react';
import { useStateContext } from '../../context/StateContetx';
import toast from 'react-hot-toast';
import { strings } from '../../strings';
import { MdAddShoppingCart, MdShoppingCartCheckout } from "react-icons/md";


const ProductDetails = ({ product, otherProducts }) => {


    const { product_name, product_image, price, description, arabic_name, off_price, persian_name, available, arabic_desc, persian_desc, in_sale } = product;
    const [index, setIndex] = useState(0);
    const { incQty, decQty, qty, onAdd, setShowCart, user, lang } = useStateContext();

    const onBuyNow = (product, qty) => {

        if (user) {
            onAdd(product, qty);
            setShowCart(true);
        } else {
            toast.error(strings.LOGIN_PLS_MSG[lang], { duration: 3000 })
        }

    }

    const addProduct = () => {
        if (user) {
            onAdd(product, qty);
        } else {
            toast.error(strings.LOGIN_PLS_MSG[lang], { duration: 3000 })

        }
    }

    return (
        <div>
            <div className='fixed-btn md:hidden'> <button type='button' disabled={!available} onClick={addProduct} className='px-3 py-4 border border-red-500  text-md font-semibold bg-white text-red-500 cursor-pointer  flex-1 hover:bg-gray-100 hover:ease-in-out hover:duration-300'>
                <span className='flex flex-row items-center justify-center'>
                <MdAddShoppingCart size={25} className='text-red-400 mr-2'/>
                {strings.ADD[lang]}
                </span>
                
                </button>
                <button type='button' disabled={!available} onClick={() => onBuyNow(product, qty)} className='px-3 py-4  text-md font-semibold bg-red-500 text-white cursor-pointer flex-1 transition-transform hover:bg-red-600 hover:ease-in-out hover:duration-300'>
                <span className='flex flex-row items-center justify-center'>
                <MdShoppingCartCheckout size={25} className='text-white mr-2'/>
                {strings.BUY_NOW[lang]}
                </span>
               
                    </button>
            </div>
            <div className='flex flex-col md:flex-row sm:px-4 mt-[40px] gap-[40px] text-gray-500 '>
                <div>
                    <div className='w-full md:w-[400px] h-[400px]'>
                        <a href={urlFor(product_image && product_image[0])}>
                            <img alt='product-image' className={available ? 'mx-auto rounded-md bg-gray-50 w-[400px] h-[400px] cursor-pointer transition hover:bg-red-500 hover:duration-300 ease-in-out' : 'mx-auto rounded-md bg-gray-50 w-[400px] h-[400px] cursor-pointer transition hover:bg-red-500 hover:duration-300 ease-in-out  filter grayscale'} src={urlFor(product_image && product_image[index])} />
                        </a>
                    </div>
                    <div className='flex px-4 gap-[10px] mt-[20px]'>
                        {product_image?.map((item, i) => (
                            <img key={i} src={urlFor(item)}
                                className={i === index ? "rounded-sm bg-red-500 w-[70px] h-[70px] cursor-pointer" : "rounded-sm bg-gray-50 w-[70px] h-[70px] cursor-pointer"}
                                onMouseEnter={() => setIndex(i)}
                                alt='thumbnail' />
                        ))}
                    </div>
                </div>
                <div className='px-4 md:p-1 flex flex-col justify-center items-center md:items-start w-full '>
                    <h1 className='text-gray-700 font-semibold text-xl'>{lang == 'du' ? product_name : (lang == 'ar' ? arabic_name : persian_name)}</h1>
                    <div className='reviews'>
                        <div className='flex flex-row'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />

                        </div>
                        <p></p>
                    </div>
                    <div className='flex flex-row justify-start space-x-3'>

                        <p className='font-bold text-lg mt-10 text-gray-500'>{strings.PRICE_LBL[lang]}</p>

                        <p className={in_sale ? 'ont-bold text-lg mt-10 text-red-500 line-through' : 'ont-bold text-lg mt-10 text-red-500'}>€{price}</p>

                        {in_sale &&

                            <p className='font-bold text-lg mt-10 text-green-500'>€{off_price}</p>

                        }
                    </div>
                    <div className='flex flex-row gap-[20px] mt-4 items-center'>
                        <h3>{strings.QTY[lang]} :</h3>
                        <p className='grid grid-cols-3 mx-auto mt-3 w-[100px] ml-2 border border-gray-400 p-0 '>
                            <span className='text-[16px] px-1 py-1 cursor-pointer border border-gray-400 text-red-500' onClick={decQty}>
                                <FiMinus />
                            </span>
                            <span className='px-1 py-1  bg-blue-300 cursor-pointer border-r border-gray-400 text-[20px]' >
                                {qty}
                            </span>
                            <span className='text-[16px]  px-1 py-1 cursor-pointer text-green-500' onClick={incQty}>
                                <FiPlus />
                            </span>
                        </p>
                    </div>

                    <div className='hidden md:block w-full'>

                        <button type='button' disabled={!available} onClick={addProduct} className='px-3 py-5 border border-red-500 mt-10 text-md font-semibold bg-white text-red-500 cursor-pointer w-full md:w-64 transition-transform hover:scale-105 hover:ease-in-out hover:duration-300'>{strings.ADD[lang]}</button>
                        <button type='button' disabled={!available} onClick={() => onBuyNow(product, qty)} className='px-3 py-5 border border-red-500 mt-10 text-md font-semibold bg-red-500 text-white cursor-pointer w-full md:w-64 transition-transform hover:scale-105 hover:ease-in-out hover:duration-300'>{strings.BUY_NOW[lang]}</button>

                    </div>

                    <h4 className='mt-4 font-semibold'>{strings.DETAIL[lang]}</h4>
                    <p className='text-gray-500'>{lang == 'du' ? description : (lang == 'ar' ? arabic_desc : persian_desc)}</p>
                </div>
            </div>

            <div className='maylike-products-wrapper'>
                <h2>{strings.SIMILAR_PRO[lang]}</h2>
                <div className='marquee'>
                    <div className='track maylike-products-container'>
                        {otherProducts.map((item) => (
                            <div key={item._id} >
                                <Product key={item._id} product={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export const getStaticPaths = async () => {

    const query = `*[_type == "product" && defined(slug.current)]{
        slug{
            current
        }
    }`;

    const pros = await client.fetch(query);


    const paths = pros.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {

    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const otherQuery = '*[_type == "product" && defined(slug.current)]';


    const product = await client.fetch(query)
    console.log(product)
    const pros = await client.fetch(otherQuery)

    const otherProducts = pros.filter(item => !Object.values(item).includes(null))

    return {
        props: { product, otherProducts }
    }

}

export default ProductDetails
