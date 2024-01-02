import React from 'react'
import { client, urlFor } from "../../lib/client"
import { FiStar, FiPlus, FiMinus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Product } from "../../components";
import { useState } from 'react';
import { useStateContext } from '../../context/StateContetx';
import toast from 'react-hot-toast';
import { strings } from '../../strings';


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
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <a href={urlFor(product_image && product_image[0])}>
                            <img alt='product-image' className={available ? 'product-detail-image' : 'product-detail-image filter grayscale'} src={urlFor(product_image && product_image[index])} />
                        </a>
                    </div>
                    <div className='small-images-container'>
                        {product_image?.map((item, i) => (
                            <img key={i} src={urlFor(item)}
                                className={i === index ? "small-image selected-image" : "small-image"}
                                onMouseEnter={() => setIndex(i)}
                                alt='thumbnail' />
                        ))}
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{lang == 'du' ? product_name : (lang == 'ar' ? arabic_name : persian_name)}</h1>
                    <div className='reviews'>
                        <div className='flex flex-row'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FiStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <div className='flex flex-row justify-start space-x-3'>
                        <p className={in_sale ? 'price line-through' : 'price'}>€{price}</p>

                        {in_sale &&
                            <p className='price'>€{off_price}</p>
                        }
                    </div>
                    <div className='space-y-2 quantity'>
                        <h3>{strings.QTY[lang]}</h3>
                        <p className='flex flex-row quantity-desc'>
                            <span className='minus' onClick={decQty}>
                                <FiMinus />
                            </span>
                            <span className='num' >
                                {qty}
                            </span>
                            <span className='plus' onClick={incQty}>
                                <FiPlus />
                            </span>
                        </p>
                    </div>

                    <div className='buttons'>

                        <button type='button' disabled={!available} onClick={addProduct} className='add-to-cart'>{strings.ADD[lang]}</button>
                        <button type='button' disabled={!available} onClick={() => onBuyNow(product, qty)} className='buy-now'>{strings.BUY_NOW[lang]}</button>

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
