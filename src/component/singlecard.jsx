
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "./cartcontext";


export default function SingelProduct() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [currentItemQ, setCurrentIntemQ] = useState(0)
    const [cart, setCart, addToCart,DeletCart] = useContext(CartContext)
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  useEffect(() => {
    const quantity = cart.find(item => item.id === id)?.quantity

    if (quantity) {
      setCurrentIntemQ(quantity)
    }

  }, [cart])


  if (!data) {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }
  return (
    <>
      <div className="box w-[90%] md:w-[50%] mx-auto mt-20   shadow-xl relative h-[600px]  mb-20">
        <img
          src={data.image}
          alt=""
          className="h-[400px] aspect-asuare object-contain w-full mx-auto mb-[-40px] md:mb-0"
        />
        <h1 className="font-bold mt-[40px] ">{data.title}</h1>
        <p className="mt-3 mb-2 pl-2 line-clamp-2">{data.description}</p>

        <a className="text-green-300 pt-10  pl-2">
          ${data.price}
        </a>
             {currentItemQ > 0 ? (
          <div className="flex gap-2 ">
            <button onClick={() => addToCart(id)} className=" border bg-gray-400 absolute bottom-5 left-[25%]  rounded text-white w-[20%]">+</button>
            <span className="absolute bottom-5 left-[52%] ">{currentItemQ}</span>
            <button  onClick={() => DeletCart(id)}  className="border bg-gray-400 absolute bottom-5 right-[18%] rounded text-white w-[20%]">-</button>
          </div>
        ) : (
          <button className="bg-blue-600 absolute bottom-5 left-[35%] rounded text-white w-[25%]" onClick={() => addToCart(id)}>add to cart</button>
        )}


      </div>
    </>
  );


}