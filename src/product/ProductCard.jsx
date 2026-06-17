import { Link } from "react-router-dom";

export default function ProductCard({ id, image, title, price ,description}) {

    return (
        <Link to={`/single-product/${id}`}>
            <div className="box shadow-xl h-[600px] relative m-8">
                <img src={image} className='aspect-asuare object-contain w-full h-[350px]' alt="" />

                <h3 className="mt-4 line-clamp-3 font-bold pl-2" >{title}</h3>
                <p className="line-clamp-2 pl-2 mt-4">{description}</p>
                <span className="text-green-300 absolute bottom-12 left-[2%] pl-2">{price}</span>
                <button className="bg-blue-600 absolute bottom-5 left-[35%] rounded text-white w-[25%]">add cart</button>

            </div>
        </Link>
    )
}