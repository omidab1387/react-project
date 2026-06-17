import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 ">
      {data.map((item) => (
        <ProductCard key={item.id} id={item.id} image={item.image} title={item.title} price={item.price} description={item.description} />

      ))}
    </div>

  )


}