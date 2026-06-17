
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from './cartcontext';
import { useContext } from 'react';
import { useMemo } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart] = useContext(CartContext)
  const sumOfQuantities = useMemo(() => {
    return cart.reduce((acc, current) => {
      return acc + current.quantity
    }, 0)
  }, [cart])

  return (

    <>
      <header className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">


            <div className="text-3xl font-bold tracking-tight">
              <span className="text-blue-700">O</span>
            </div>


            <div className="flex items-center gap-4">
              <Link to={'/'}>

                <button className="hidden md:block hover:text-blue-400 transition text-sm">
                  خانه

                </button>
              </Link>

              <div className="hidden md:flex items-center gap-4">
                <Link to={'/log-in'}>
                <button className="hover:text-blue-400 transition text-sm">
                  ورود
                </button>
                </Link>
            

                  <button className="hover:text-blue-400 transition text-sm">

                    سبد خرید

                    <span className='text-blue-400'>{sumOfQuantities}</span>
                  </button>
             
                <Link to={'/about'}>
                  <button className="hover:text-blue-400 transition text-sm">
                    درباره ما
                  </button>
                </Link>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden hover:text-blue-400 text-2xl"
              >
                ☰
              </button>
            </div>
          </div>
        </div>


        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)}>
            <div className="absolute left-0 top-0 h-full w-64 bg-gray-900 shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">منو</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-2xl hover:text-blue-400">✕</button>
              </div>
              <div className="flex flex-col gap-4">
                <a href="/" className="py-2 hover:text-blue-400 transition">خانه</a>
                <a href="/" className="py-2 hover:text-blue-400 transition">محصولات</a>
                <a href="/about" className="py-2 hover:text-blue-400 transition"> درباره ما</a>
                <hr className="border-gray-700 my-2" />
                <a href="log-in" className="py-2 hover:text-blue-400 transition">ورود به حساب</a>
                <a href="/shop-cart" className="py-2 hover:text-blue-400 transition">سبد خرید
                  <span className='text-blue-400'>{sumOfQuantities}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header >






    </>
  )



}