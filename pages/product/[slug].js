 import React from 'react'
 import {client,urlFor} from "../../lib/client"
 import { FiStar,FiPlus, FiMinus } from "react-icons/fi";
 import { FaStar } from "react-icons/fa";
 import {Product} from "../../components";
 import {useState} from 'react';
 import { useStateContext } from '../../context/StateContetx';
 import toast from 'react-hot-toast';

 const ProductDetails = ({product ,otherProducts}) => {

    
    const {product_name,product_image,price,description,arabic_name,persian_name} = product;
    const [index,setIndex] = useState(0);
    const {incQty,decQty,qty,onAdd,setShowCart,user,lang} = useStateContext();

    const onBuyNow =(product,qty)=>{

        if(user){
             onAdd(product,qty);
             setShowCart(true);
        }else{
            toast.error('please log in to continue shopping')
        }
       
    }

    const addProduct = ()=>{
        if(user){
            onAdd(product,qty);
        }else{
            toast.error('please log in to continue shopping')

        }
    }

   return (
     <div>
       <div className='product-detail-container'>
        <div>
            <div className='image-container'>
                <img className='product-detail-image' src={urlFor(product_image && product_image[index])} />
            </div>
            <div className='small-images-container'>
                {product_image?.map((item,i)=>(
                    <img key={i} src={urlFor(item)}
                    className={i === index?"small-image selected-image":"small-image"}
                    onMouseEnter={()=>setIndex(i)}/>
                ))}
            </div>
        </div>
        <div className='product-detail-desc'>
            <h1>{lang=='du'?product_name:(lang=='ar'?arabic_name:persian_name)}</h1>
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
            <p className='price'>€{price}</p>

            <div className='space-y-2 quantity'>
                <h3>{lang=='du'?'kwantiteit:':(lang=='ar'?'كمية':'تعداد :')}</h3>
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

                 <button type='button' onClick={addProduct} className='add-to-cart'>{lang=='du'?'voeg het toe':(lang=='ar'?'إضافته':'اضافه کن')}</button>
                 <button type='button' onClick={()=>onBuyNow(product,qty)} className='buy-now'>{lang=='du'?'koop nu':(lang=='ar'?'اشتري الآن':'الان بخر')}</button>

            </div>

            <h4 className='mt-4 font-semibold'>{lang=='du'?'Details:':(lang=='ar'?'تفاصيل':'جزئیات :')}</h4>
            <p className='text-gray-500'>{description}</p>
        </div>
       </div>

       <div className='maylike-products-wrapper'>
        <h2>{lang=='du'?'vergelijkbare producten':(lang=='ar'?'منتجات مماثلة':'محصولات مشابه')}</h2>
        <div className='marquee'>
            <div className='track maylike-products-container'>
                {otherProducts.map((item)=>(
                    <Product key={item._id} product={item}/>
                ))}
            </div>
        </div>
       </div>
      
     </div>
   )
 }

 export const getStaticPaths = async()=>{

    const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

    const otherProducts = await client.fetch(query);
    const paths = otherProducts.map((product)=>({
        params:{
            slug : product.slug.current
        }
    }));

    return {
        paths,
        fallback:'blocking'
    }
 }

 export const getStaticProps = async ({params:{slug}})=>{

    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const otherQuery = '*[_type == "product"]';
  
  
    const product = await client.fetch(query)
    console.log(product)
    const otherProducts = await client.fetch(otherQuery)
  
    return{
      props:{product,otherProducts}
    }
  
  }
 
 export default ProductDetails
 