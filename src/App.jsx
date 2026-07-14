
import Header from './component/header'
import Layout from './layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './product/home'
import SingelProduct from './component/singlecard'
import { useEffect, useState } from 'react'
import AboutUs from './component/AboutUs'
import LogIn from './component/login'
import AdminPanel from "./component/admin-panel";
import Shopcart from './component/shopingCart'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [data, setData] = useState(null)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
      },
    }
  })

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);







  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    )

  }

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Routes>

              <Route path="/" element={<Home />} />

              <Route
                path="/single-product/:id"
                element={<SingelProduct />}
              />

              <Route path="/about" element={<AboutUs />} />

              <Route path="/log-in" element={<LogIn />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/shopping" element={<Shopcart />} />

            </Routes>
          </Layout>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}


export default App
