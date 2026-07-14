import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("خطا در دریافت اطلاعات");
        }

        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">

      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-700 rounded-3xl p-12 text-white mb-10">
        <h1 className="text-5xl font-bold mb-4">
          فروشگاه آنلاین
        </h1>

        <p className="text-lg text-gray-200">
          جدیدترین محصولات با بهترین قیمت
        </p>
      </div>

      {/* عنوان */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">محصولات</h2>
          <p className="text-gray-500 mt-2">
            {data.length} محصول
          </p>
        </div>
      </div>

      {/* محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>

    </div>
  );
}