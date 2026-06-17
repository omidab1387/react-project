
import Header from './component/header'
import Layout from './layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './product/home'
import SingelProduct from './component/singlecard'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import CartContext from './component/cartcontext'
import { useCallback } from 'react'
import AboutUs from './component/AboutUs'
import LogIn from './component/login'
import Shopcart from './component/shopingCart'

function App() {
const [data,setData]=useState(null)
  const [cart, setCart] = useState([])


   useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);



const addToCart = useCallback((id) => {

    const foundIndex = cart.findIndex(item => item.id == id)

    if (foundIndex === -1) {
      setCart([...cart, {
        id,
        quantity: 1
      }])
    } else {
      const copy = structuredClone(cart)

      copy[foundIndex].quantity++;

      setCart(copy)
    }
  }, [cart])


if(!data){
  return( 
         <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
      )
  
}

  return (
    <>
      <BrowserRouter>
        <CartContext.Provider value={[cart, setCart, addToCart,]}>
          <Layout >
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/single-product/:id" element={<SingelProduct cart={cart} setCart={setCart} />} />
              <Route path='/about' element={<AboutUs/>} />
              <Route path='/log-in' element={<LogIn/>}  />
              <Route path='/shopping' element={<Shopcart/>}/>
            </Routes>
          </Layout>
        </CartContext.Provider>

      </BrowserRouter>
    </>
  )
}


export default App
