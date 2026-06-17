import React from "react"
export default function Footer(){



    return(
            <footer className="bg-gray-800 text-white mt-auto py-8">
      <div className="container  px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-right">

          <div>
            <h4 className="font-bold text-blue-400 mb-3 text-sm uppercase">Main</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-blue-400 mb-3 text-sm uppercase">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Offers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-blue-400 mb-3 text-sm uppercase">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><a href='/log-in' className="text-gray-300 hover:text-blue-400 transition">Login</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Register</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Cart</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-blue-400 mb-3 text-sm uppercase">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Instagram</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Telegram</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    )
}