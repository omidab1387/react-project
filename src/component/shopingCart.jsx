import { useEffect, useState } from "react";
import useCartStore from "./cartStore";
import Cart from "./cart"
import { Link } from "react-router-dom";

export default function Shopcart() {
  const [products, setProducts] = useState([]);
  const cart = useCartStore((state) => state.cart); useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalPrice = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return total;

    return total + product.price * item.quantity;
  }, 0);
  return (
    <div className="container mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        سبد خرید
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* لیست محصولات */}
        <div className="lg:col-span-2 space-y-6">

          {cart.map((item) => {
            const product = products.find((p) => p.id === item.id);

            if (!product) return null




            return (
              <Cart
                key={item.id}
                product={product}
                quantity={item.quantity}
              />
            );
          })}

        </div>

        {/* خلاصه سفارش */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">

          <h2 className="text-2xl font-bold mb-6">
            خلاصه سفارش
          </h2>

          <div className="flex justify-between mb-4">
            <span>تعداد کالا</span>
            <span>{cart.length}</span>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-xl font-bold">
            <span>مبلغ کل</span>
            <span>{totalPrice.toFixed(2)}</span>
          </div>
          <Link to={'/'}>
            <button
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              ادامه خرید
            </button>
          </Link>

        </div>

      </div>

    </div>
  )
}