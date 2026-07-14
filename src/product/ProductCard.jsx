import { Link } from "react-router-dom";
import useCartStore from "../component/cartStore";

export default function ProductCard({ id, image, title, price, description }) {
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const productInCart = cart.find((item) => item.id === id);
    return (
        <div className="box shadow-xl h-[600px] relative m-8 flex flex-col">

            <Link to={`/single-product/${id}`} className="flex-1">
                <img
                    src={image}
                    className="aspect-square object-contain w-full h-[350px]"
                    alt=""
                />

                <h3 className="mt-4 line-clamp-3 font-bold pl-2">
                    {title}
                </h3>

                <p className="line-clamp-2 pl-2 mt-4">
                    {description}
                </p>
            </Link>


            <div className="absolute bottom-16 left-0 w-full px-3">
                <span className="text-green-500 text-xl font-bold">
                    ${price}
                </span>
            </div>


            {
                productInCart ? (

                    <div className="absolute bottom-0 left-0 w-full h-14 bg-blue-600 rounded-b-lg flex items-center justify-center gap-6 text-white">

                        <button
                            onClick={() => removeFromCart(id)}
                            className="text-3xl font-bold"
                        >
                            -
                        </button>


                        <span className="text-xl font-bold">
                            {productInCart.quantity}
                        </span>


                        <button
                            onClick={() => addToCart(id)}
                            className="text-3xl font-bold"
                        >
                            +
                        </button>

                    </div>

                ) : (

                    <button
                        onClick={() => addToCart(id)}
                        className="absolute bottom-0 left-0 w-full h-14 bg-blue-600 rounded-b-lg text-white text-lg font-bold hover:bg-blue-700 transition"
                    >
                        add cart
                    </button>

                )
            }

        </div>
    );
}