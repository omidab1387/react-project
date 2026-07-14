import { useEffect, useState } from "react";
import useCartStore from "./cartStore";
import { useParams } from "react-router-dom";

export default function SingelProduct() {
  const { id: paramId } = useParams();
  const id = Number(paramId);

  const [data, setData] = useState(null);

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const currentItemQ =
    cart.find((item) => item.id === id)?.quantity ?? 0;


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);


  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-center items-center bg-gray-100 rounded-xl p-6">
          <img
            src={data.image}
            alt={data.title}
            className="h-[420px] object-contain transition duration-300 hover:scale-105"
          />
        </div>


        <div className="flex flex-col justify-center">

          <span className="text-sm text-blue-600 font-medium uppercase">
            {data.category}
          </span>

          <h1 className="text-3xl font-bold mt-3 mb-5 text-gray-800">
            {data.title}
          </h1>


          <div className="flex gap-6 mb-5 text-gray-500">
            <span>امتیاز: {data.rating?.rate}</span>
            <span>{data.rating?.count} نظر</span>
          </div>


          <div className="text-4xl font-bold text-green-600 mb-8">
            ${data.price}
          </div>


          <div className="border rounded-lg p-4 bg-gray-50 mb-8">
            <p className="text-gray-600 leading-8">
              {data.description}
            </p>
          </div>


          {currentItemQ > 0 ? (
            <div className="flex items-center gap-5">

              <button
                onClick={() => addToCart(id)}
                className="w-12 h-12 rounded-lg bg-blue-600 text-white text-2xl hover:bg-blue-700 transition"
              >
                +
              </button>

              <span className="text-2xl font-bold">
                {currentItemQ}
              </span>


              <button
                onClick={() => removeFromCart(id)}
                className="w-12 h-12 rounded-lg bg-red-600 text-white text-2xl hover:bg-red-700 transition"
              >
                -
              </button>

            </div>
          ) : (

            <button
              onClick={() => addToCart(id)}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              افزودن به سبد خرید
            </button>

          )}

        </div>
      </div>
    </div>
  );
}