import useCartStore from "./cartStore";

export default function Cart({ product, quantity }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex gap-6 items-center">

            <img
                src={product.image}
                className="w-32 h-32 object-contain bg-gray-100 rounded-xl p-3"
            />

            <div className="flex-1">

                <h2 className="font-bold text-xl line-clamp-2">
                    {product.title}
                </h2>

                <p className="text-green-600 text-2xl font-bold mt-4">
                    ${product.price}
                </p>

            </div>

            <div className="flex items-center gap-4">

                <button onClick={() => addToCart(product.id)}>+</button>

                <span>{quantity}</span>

                <button onClick={() => removeFromCart(product.id)}>-</button>

            </div>

        </div>
    )
}