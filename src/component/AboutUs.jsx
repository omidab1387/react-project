export default function AboutUs() {
    return (

      <div className="w-full px-4 md:px-8 py-8 md:py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 md:p-12 w-full max-w-7xl mx-auto">
          
          <div className="mb-2">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
              Omid <span className="text-blue-600">Shop</span>
            </h1>
          </div>
          <p className="text-xl text-slate-500 border-r-4 border-blue-600 pr-4 mb-10">
            Shop with hope for the right choice
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">What is Omid Shop?</h2>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Omid Shop</strong> is a modern online store built on top of the 
                <strong className="text-slate-800"> FakeStore API</strong>. We believe online shopping should be 
                simple, transparent, and stress-free.
              </p>
              <p className="text-slate-600 leading-relaxed mt-3">
                Our name, "Omid" (meaning "hope" in Persian), reflects our mission to make every purchase a positive experience.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">Why Choose Us?</h2>
              <ul className="text-slate-600 leading-relaxed space-y-2 list-disc list-inside marker:text-blue-600">
                <li>Clean and intuitive user interface</li>
                <li>Real products with accurate pricing</li>
                <li>No data storage — privacy matters</li>
                <li>Responsive support team</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl border border-blue-100/60 px-8 py-6 mt-8 flex flex-wrap justify-around gap-5">
            <div className="text-center">
              <span className="block text-3xl font-bold text-blue-600">200+</span>
              <span className="text-sm text-slate-500">Products</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-blue-600">4.8</span>
              <span className="text-sm text-slate-500">Avg. Rating</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-blue-600">Live</span>
              <span className="text-sm text-slate-500">API Sync</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-blue-600">Fast</span>
              <span className="text-sm text-slate-500">Delivery</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">How It Works</h2>
            <p className="text-slate-600 leading-relaxed">
              All products are fetched dynamically from the <strong className="text-slate-800">FakeStore API</strong>. 
              This means any update in the source is instantly reflected on Omid Shop — no manual maintenance required.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              This store is a practical demonstration of working with external APIs and is ready 
              to connect to real payment gateways and inventory systems.
            </p>
          </div>

          <hr className="my-8 border-slate-200/80" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Get in Touch</h2>
              <p className="text-slate-600 mb-3">We would love to hear your feedback:</p>
              <div className="flex flex-col gap-2 text-sm md:text-base">
                <a href="mailto:support@omidshop.example" className="text-blue-600 hover:underline underline-offset-2">
                  support@omidshop.example
                </a>
                <a href="#" className="text-blue-600 hover:underline underline-offset-2">@omidshop</a>
                <span className="text-slate-600">+98 21 1234 5678</span>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100/60 w-full">
                <p className="text-slate-700 font-medium">Working Hours</p>
                <p className="text-slate-500 text-sm">Monday - Friday: 9:00 AM - 9:00 PM</p>
                <p className="text-slate-500 text-sm">Saturday: 10:00 AM - 6:00 PM</p>
                <p className="text-slate-500 text-sm">Sunday: Closed</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    


        
            )
            
}