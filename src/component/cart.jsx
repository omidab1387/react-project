import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import CartContext from "./cartcontext"

export default function Cart({ id, quantity }) {
    const [data, setData] = useState(null)
    const [cart, setCart, addToCart,DeletCart] = useContext(CartContext)

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(json => setData(json));
    }, [])

    if (!data) {
         return( 
         <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
      )
    }
    return (
        <div className="flex gap-4 items-center px-4 py-2 rounded-md">
            <img className="w-20" src={data.image} alt="" />
            <h3>{data.title}</h3>

            <div className="flex gap-2 items-center">
                <button className="px-4 py-2 rounded-sm bg-gray-400" onClick={() => addToCart(id)}>+</button>
                <span>{quantity}</span>
                <button onClick={() => DeletCart(id)}   className="px-4 py-2 rounded-sm bg-gray-400">-</button>
            </div>
        </div>
    )
}