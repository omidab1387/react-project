import { useContext } from "react"
import CartContext from "./cartcontext"
import Cart from "./cart"

export default function Shopcart(){
  const [cart] = useContext(CartContext)
      return(
        <div className="container mx-auto">
            {cart.map(item=><Cart key={item.id} id={item.id} quantity={item.quantity}/>)}
        </div>
      )
}