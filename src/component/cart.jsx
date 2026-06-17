import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import CartContext from "./cartcontext"

export default function Cart({ id, quantity }) {
    const [data, setData] = useState(null)
    const [cart, setCart, addToCart] = useContext(CartContext)

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(json => setData(json));
    }, [])

    if (!data) {
        return <h1>LOADING...</h1>
    }
    return (
        <div className="flex gap-4 items-center px-4 py-2 rounded-md">
            <img className="w-20" src={data.image} alt="" />
            <h3>{data.title}</h3>

            <div className="flex gap-2 items-center">
                <button className="px-4 py-2 rounded-sm bg-green-400" onClick={() => addToCart(id)}>+</button>
                <span>{quantity}</span>
                <button className="px-4 py-2 rounded-sm bg-red-400">-</button>
            </div>
        </div>
    )
}