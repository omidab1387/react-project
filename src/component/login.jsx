export default function LogIn (){
      return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          ورود
        </h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نام کاربری یا ایمیل
            </label>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رمز عبور
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between text-sm mb-5">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="ml-2" />
              مرا به خاطر بسپار
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              رمز را فراموش کردم
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition duration-200"
          >
            ورود
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          حساب ندارید؟{' '}
          <a href="#" className="text-blue-600 hover:underline">
            ثبت نام
          </a>
        </p>
      </div>
    </div>
  );
}