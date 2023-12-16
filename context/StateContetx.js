import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);
    const [user,setUser] =useState(null)

    let foundItem;
    let index;

    

    const onAdd = (product, quantity) => {


        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prevPrice) => prevPrice + product.price * quantity)
        setTotalQuantity((prevQty) => prevQty + quantity)

        if (checkProductInCart) {
            let prevProQuantity = checkProductInCart.quantity;
            let newItemsInCArt = cartItems.filter((item)=>item._id !== checkProductInCart._id)
            setCartItems([...newItemsInCArt,{...product,'quantity':prevProQuantity+quantity}])
           

        } else {

            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }])

        }

        toast.success(`${qty} ${product.product_name} toegevoegd aan de winkelwagen`,{duration:2000});
    }

    const onRemove =(product)=>{

        const newItems = cartItems.filter((item)=>item._id!== product._id)

        setTotalPrice((prevToP)=>prevToP-product.price*product.quantity)
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
            setTotalPrice((prevToP) => prevToP + foundItem.price)
            setTotalQuantity((prevToQ) => prevToQ + 1)

        } else if (value == 'dec') {
            if (foundItem.quantity > 1) {
                let newCartItems = [...newCArtItem.slice(0,index), { ...foundItem, 'quantity': foundItem.quantity - 1 },...newCArtItem.slice(index)]
                setCartItems(newCartItems)
                setTotalPrice((prevToP) => prevToP - foundItem.price)
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

    return (
        <Context.Provider value={{
            showCart, cartItems, totalPrice, totalQuantity,
            setShowCart, qty, incQty, decQty, onAdd,
            toggleCartItemQuantity,onRemove,
            setCartItems,setTotalPrice,setTotalQuantity,
            user,setUser
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)

