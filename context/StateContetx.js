import { strings } from '../strings';
import React, { createContext, useContext, useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {

    let currentUser;
    let userlang;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        currentUser= JSON.parse(localStorage.getItem('user'))
        console.log(currentUser)
        userlang = JSON.parse(localStorage.getItem('userlang'))
      }
  
      

    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);
    const [user,setUser] =useState(currentUser);
    const [lang,setLang] = useState(userlang ||'du')
   


  
    useEffect(()=>{

        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
        localStorage.setItem('totalPrice',JSON.stringify(totalPrice))
        localStorage.setItem('totalqty',JSON.stringify(totalQuantity))
        localStorage.setItem('userlang',JSON.stringify(lang))
        
      },[user,lang])

      
    let foundItem;
    let index;

    const sum = (a, b, positions) => {
        const factor = Math.pow(10, positions)
        return ((a *factor + b * factor)/ factor).toFixed(2)
      }
      const minus = (a, b, positions) => {
        const factor = Math.pow(10, positions)
        return ((a * factor - b*factor)/ factor).toFixed(2)
      }


    const onAdd = (product, quantity) => {


        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prevPrice) => sum(prevPrice,product.price * quantity,2))
        setTotalQuantity((prevQty) => prevQty + quantity)

        if (checkProductInCart) {
            let prevProQuantity = checkProductInCart.quantity;
            let newItemsInCArt = cartItems.filter((item)=>item._id !== checkProductInCart._id)
            setCartItems([...newItemsInCArt,{...product,'quantity':prevProQuantity+quantity}])
           

        } else {

            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }])

        }
        let msg =strings.ADD_CART_MSG[lang]
        let name = lang =='du'?product.product_name:(lang=='ar'?product.arabic_name:product.persian_name)
        toast.success(`${quantity} ${name} ${msg} `,{duration:2000});
    }

    const onRemove =(product)=>{

        const newItems = cartItems.filter((item)=>item._id!== product._id)

        setTotalPrice((prevToP)=>minus(prevToP,product.price*product.quantity,2))
        setTotalQuantity((prevToQ)=>prevToQ-product.quantity)

        setCartItems(newItems)
    }

    const toggleCartItemQuantity = (id, value) => {

        foundItem = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)

        const newCArtItem = cartItems.filter((item)=>item._id !== id)
        if (value == 'inc') {

            let newCartItems = [...newCArtItem.slice(0,index), { ...foundItem, 'quantity': foundItem.quantity + 1 },...newCArtItem.slice(index)]
            setCartItems(newCartItems)
            setTotalPrice((prevToP) => sum(prevToP , foundItem.price,2))
            setTotalQuantity((prevToQ) => prevToQ + 1)

        } else if (value == 'dec') {
            if (foundItem.quantity > 1) {
                let newCartItems = [...newCArtItem.slice(0,index), { ...foundItem, 'quantity': foundItem.quantity - 1 },...newCArtItem.slice(index)]
                setCartItems(newCartItems)
                setTotalPrice((prevToP) =>minus(prevToP , foundItem.price,2))
                setTotalQuantity((prevToQ) => prevToQ - 1)
            }
        }
    }


    const incQty = () => {
        setQty((prev) => prev + 1)
    }

    const decQty = () => {

        setQty((prev) => {
            if (prev <= 1) return 1;
            return prev - 1;
        })
    }
    const logout = ()=>{
        setUser(null)
        setTotalPrice(0)
        setCartItems([])
        setTotalQuantity(0)
        setQty(1)
        if(typeof window !== 'undefined'){
            localStorage.clear();
        }
    }

    return (
        <Context.Provider value={{
            showCart, cartItems, totalPrice, totalQuantity,
            setShowCart, qty, incQty, decQty, onAdd,
            toggleCartItemQuantity,onRemove,
            setCartItems,setTotalPrice,setTotalQuantity,
            user,setUser,lang,setLang,logout
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)

