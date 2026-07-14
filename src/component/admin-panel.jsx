import { useState, useMemo } from "react";
import useAuthStore from "./authStore";
import { useMutation, useQuery, QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Routes, Route, Link, useLocation, useNavigate,
} from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, Package, ShoppingCart, UserCircle, LogOut,
  Search, Bell, TrendingUp, TrendingDown, DollarSign, Eye, X, Pencil, Trash2,
  Menu, Minus, Plus, Camera,
} from "lucide-react";


const ACCENT = {
  amber: "#e8a33d",
  rust: "#d9714e",
  teal: "#4fb6a8",
  rose: "#e1647e",
};

const fakeWeeklySales = [
  { day: "شنبه", sales: 4200 },
  { day: "یک‌شنبه", sales: 5100 },
  { day: "دوشنبه", sales: 3800 },
  { day: "سه‌شنبه", sales: 6200 },
  { day: "چهارشنبه", sales: 5600 },
  { day: "پنج‌شنبه", sales: 7400 },
  { day: "جمعه", sales: 8100 },
];

const fakeCart = [
  { id: "c1", title: "هدفون بی‌سیم نویز کنسلینگ", price: 89, qty: 1, image: "https://fakestoreapi.com/img/4skzbAQ.jpg" },
  { id: "c2", title: "کیف چرم دستی زنانه", price: 54, qty: 2, image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UL640_QL65_ML3_.jpg" },
  { id: "c3", title: "ساعت هوشمند ورزشی", price: 132, qty: 1, image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" },
];

const navItems = [
  { to: "/AdminPanel", icon: LayoutDashboard, label: "داشبورد" },
  { to: "/products", icon: Package, label: "محصولات" },
  { to: "/CartItem", icon: ShoppingCart, label: "سبد خرید" },

];

const pageTitles = {
  "/": { title: "داشبورد مدیریت", subtitle: "نگاهی به وضعیت امروز فروشگاه" },
  "/products": { title: "محصولات", subtitle: "مدیریت کامل فهرست محصولات" },
  "/CartItem": { title: "سبد خرید", subtitle: "بررسی سفارش جاری مشتری نمونه" },
  "/profile": { title: "پروفایل", subtitle: "اطلاعات حساب کاربری شما" },
};

function StatCard({ icon: Icon, label, value, delta, positive, accent }) {
  return (
    <div
      className="relative rounded-2xl p-4 sm:p-5 overflow-hidden"
      style={{ background: "#1b2230", border: `1px solid ${accent}33` }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}1f`, border: `1px solid ${accent}55` }}
        >
          <Icon size={18} style={{ color: accent }} />
        </div>
        <span
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
          style={{
            color: positive ? "#7fd4a8" : "#e98a96",
            background: positive ? "rgba(127,212,168,0.12)" : "rgba(233,138,150,0.12)",
          }}
        >
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {delta}
        </span>
      </div>
      <p className="text-slate-400 text-xs sm:text-sm mt-4">{label}</p>
      <p className="text-xl sm:text-2xl font-semibold text-slate-50 mt-1 tracking-tight">{value}</p>
    </div>
  );
}

function ProductRow({ item, onEdit, onDelete }) {
  return (
    <tr className="transition-colors hover:bg-white/[0.03]" style={{ borderTop: "1px solid #2a3140" }}>
      <td className="px-4 sm:px-5 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#11151f", border: "1px solid #2a3140" }}
          >
            <img src={item.image} className="w-6 h-6 object-contain" alt={item.title} />
          </div>
          <span className="text-slate-200 max-w-[140px] sm:max-w-[220px] truncate text-sm">{item.title}</span>
        </div>
      </td>
      <td className="px-4 sm:px-5 py-3 text-sm font-medium" style={{ color: ACCENT.teal }}>
        ${item.price}
      </td>
      <td className="px-4 sm:px-5 py-3 hidden sm:table-cell">
        <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${ACCENT.amber}1f`, color: ACCENT.amber }}>
          {item.category}
        </span>
      </td>
      <td className="px-4 sm:px-5 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: `${ACCENT.teal}1f`, color: ACCENT.teal }}
            aria-label="ویرایش"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: `${ACCENT.rose}1f`, color: ACCENT.rose }}
            aria-label="حذف"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function DashboardPage({ data, isLoading, isError, error, categoryData, totalRevenue, openEdit, mutate }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard icon={DollarSign} label="درآمد این هفته" value={`${totalRevenue.toLocaleString("fa-IR")} ت`} delta="۱۲٪" positive accent={ACCENT.teal} />
        <StatCard icon={Eye} label="بازدید این هفته" value={(8730).toLocaleString("fa-IR")} delta="۸٪" positive accent={ACCENT.amber} />
        <StatCard icon={ShoppingCart} label="تعداد محصولات" value={data?.length ?? "—"} delta="۳٪" positive accent={ACCENT.rust} />
        <StatCard icon={UserCircle} label="نرخ بازگشت" value="٪۴.۲" delta="۱.۱٪" positive={false} accent={ACCENT.rose} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 rounded-2xl p-4 sm:p-5" style={{ background: "#1b2230", border: "1px solid #2a3140" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-100 font-medium text-sm">روند فروش هفتگی</h3>
            <span className="text-xs text-slate-500">داده نمونه برای نمایش</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={fakeWeeklySales}>
              <defs>
                <linearGradient id="salesGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT.teal} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={ACCENT.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#2a3140" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="#6b7383" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7383" fontSize={12} tickLine={false} axisLine={false} width={40} />
              <Tooltip contentStyle={{ background: "#11151f", border: `1px solid ${ACCENT.teal}55`, borderRadius: 10, color: "#fff", fontSize: 13 }} />
              <Line type="monotone" dataKey="sales" stroke={ACCENT.teal} strokeWidth={2.5} dot={{ fill: ACCENT.teal, r: 3 }} fill="url(#salesGlow)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-4 sm:p-5 flex flex-col" style={{ background: "#1b2230", border: "1px solid #2a3140" }}>
          <h3 className="text-slate-100 font-medium text-sm mb-2">دسته‌بندی محصولات</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={4}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#11151f", border: `1px solid ${ACCENT.rose}55`, borderRadius: 10, color: "#fff", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {categoryData.map((c) => (
              <span key={c.name} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "#1b2230", border: "1px solid #2a3140" }}>
        <div className="flex items-center justify-between px-4 sm:px-5 py-4" style={{ borderBottom: "1px solid #2a3140" }}>
          <h3 className="text-slate-100 font-medium text-sm">همه‌ی محصولات</h3>
          <span className="text-xs text-slate-500">{data?.length ?? 0} محصول</span>
        </div>
        {isLoading && <div className="px-5 py-10 text-center text-slate-500 text-sm">در حال بارگذاری...</div>}
        {isError && <div className="px-5 py-10 text-center text-rose-400 text-sm">{error.message}</div>}
        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs">
                  <th className="text-right font-normal px-4 sm:px-5 py-3">محصول</th>
                  <th className="text-right font-normal px-4 sm:px-5 py-3">قیمت</th>
                  <th className="text-right font-normal px-4 sm:px-5 py-3 hidden sm:table-cell">دسته‌بندی</th>
                  <th className="text-right font-normal px-4 sm:px-5 py-3">مدیریت</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <ProductRow key={item.id} item={item} onEdit={() => openEdit(item)} onDelete={() => mutate(item.id)} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function ProductsPage({ data, isLoading, isError, error, openEdit, mutate }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#1b2230", border: "1px solid #2a3140" }}>
      <div className="flex items-center justify-between px-4 sm:px-5 py-4" style={{ borderBottom: "1px solid #2a3140" }}>
        <h3 className="text-slate-100 font-medium text-sm">همه‌ی محصولات</h3>
        <span className="text-xs text-slate-500">{data?.length ?? 0} محصول</span>
      </div>
      {isLoading && <div className="px-5 py-10 text-center text-slate-500 text-sm">در حال بارگذاری...</div>}
      {isError && <div className="px-5 py-10 text-center text-rose-400 text-sm">{error.message}</div>}
      {!isLoading && !isError && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs">
                <th className="text-right font-normal px-4 sm:px-5 py-3">محصول</th>
                <th className="text-right font-normal px-4 sm:px-5 py-3">قیمت</th>
                <th className="text-right font-normal px-4 sm:px-5 py-3 hidden sm:table-cell">دسته‌بندی</th>
                <th className="text-right font-normal px-4 sm:px-5 py-3">مدیریت</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <ProductRow key={item.id} item={item} onEdit={() => openEdit(item)} onDelete={() => mutate(item.id)} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CartItem() {
  const [items, setItems] = useState(fakeCart);

  const changeQty = (id, delta) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ background: "#1b2230", border: "1px solid #2a3140" }}>
        <div className="px-4 sm:px-5 py-4" style={{ borderBottom: "1px solid #2a3140" }}>
          <h3 className="text-slate-100 font-medium text-sm">سبد خرید نمونه</h3>
        </div>
        {items.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-500 text-sm">سبد خرید خالی است</div>
        ) : (
          <div>
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 px-4 sm:px-5 py-4" style={{ borderTop: "1px solid #2a3140" }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#11151f", border: "1px solid #2a3140" }}>
                  <img src={it.image} className="w-8 h-8 object-contain" alt={it.title} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm truncate">{it.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: ACCENT.teal }}>${it.price}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => changeQty(it.id, -1)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ border: "1px solid #2a3140", color: "#9aa3b5" }} aria-label="کاهش">
                    <Minus size={13} />
                  </button>
                  <span className="text-sm text-slate-200 w-5 text-center">{it.qty}</span>
                  <button onClick={() => changeQty(it.id, 1)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ border: "1px solid #2a3140", color: "#9aa3b5" }} aria-label="افزایش">
                    <Plus size={13} />
                  </button>
                </div>
                <button onClick={() => removeItem(it.id)} className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT.rose}1f`, color: ACCENT.rose }} aria-label="حذف از سبد">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl p-4 sm:p-5 h-fit" style={{ background: "#1b2230", border: "1px solid #2a3140" }}>
        <h3 className="text-slate-100 font-medium text-sm mb-4">جمع‌بندی سفارش</h3>
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>تعداد اقلام</span>
          <span>{items.reduce((s, it) => s + it.qty, 0)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
          <span>هزینه ارسال</span>
          <span style={{ color: ACCENT.teal }}>رایگان</span>
        </div>
        <div className="flex items-center justify-between text-base font-medium text-slate-100 pt-4" style={{ borderTop: "1px solid #2a3140" }}>
          <span>مجموع</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="w-full mt-5 rounded-xl py-2.5 text-sm font-medium transition-transform active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${ACCENT.teal}, ${ACCENT.amber})`, color: "#11151f" }}
        >
          ثبت سفارش
        </button>
      </div>
    </div>
  );
}

function ProfilePage() {
  const [avatar, setAvatar] = useState(null);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "کاربر ادمین",
      email: "admin@example.com",
      phone: "09120000000",
    },
  });

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const onSubmit = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl">
      <div className="rounded-2xl p-5 sm:p-6" style={{ background: "#1b2230", border: "1px solid #2a3140" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
                style={{ background: "#11151f", border: `1px solid ${ACCENT.teal}55` }}
              >
                {avatar ? (
                  <img src={avatar} alt="عکس پروفایل" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={36} style={{ color: ACCENT.teal }} />
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: ACCENT.teal, color: "#11151f" }}
                aria-label="تغییر عکس پروفایل"
              >
                <Camera size={13} />
              </label>
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
            </div>
            <div>
              <p className="text-slate-100 text-sm font-medium">عکس پروفایل</p>
              <p className="text-slate-500 text-xs mt-0.5">یک تصویر برای حساب خود انتخاب کنید</p>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5">نام و نام خانوادگی</label>
            <input
              className="w-full rounded-xl px-3 py-2.5 text-sm text-slate-100 bg-transparent outline-none focus:ring-1 transition-all"
              style={{ border: `1px solid ${errors.fullName ? ACCENT.rose : "#2a3140"}` }}
              type="text"
              {...register("fullName", { required: "وارد کردن نام الزامی است" })}
            />
            {errors.fullName && <p className="text-xs mt-1" style={{ color: ACCENT.rose }}>{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5">ایمیل</label>
            <input
              className="w-full rounded-xl px-3 py-2.5 text-sm text-slate-100 bg-transparent outline-none focus:ring-1 transition-all"
              style={{ border: `1px solid ${errors.email ? ACCENT.rose : "#2a3140"}` }}
              type="email"
              {...register("email", {
                required: "وارد کردن ایمیل الزامی است",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "فرمت ایمیل صحیح نیست" },
              })}
            />
            {errors.email && <p className="text-xs mt-1" style={{ color: ACCENT.rose }}>{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5">شماره تماس</label>
            <input
              className="w-full rounded-xl px-3 py-2.5 text-sm text-slate-100 bg-transparent outline-none focus:ring-1 transition-all"
              style={{ border: `1px solid ${errors.phone ? ACCENT.rose : "#2a3140"}` }}
              type="tel"
              dir="ltr"
              {...register("phone", {
                required: "وارد کردن شماره تماس الزامی است",
                pattern: { value: /^09\d{9}$/, message: "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد" },
              })}
            />
            {errors.phone && <p className="text-xs mt-1" style={{ color: ACCENT.rose }}>{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-1 rounded-xl py-2.5 text-sm font-medium transition-transform active:scale-[0.98]"
            style={{ background: `linear-gradient(135deg, ${ACCENT.teal}, ${ACCENT.amber})`, color: "#11151f" }}
          >
            ذخیره تغییرات
          </button>

          {saved && (
            <p className="text-xs text-center" style={{ color: ACCENT.teal }}>اطلاعات با موفقیت ذخیره شد</p>
          )}
        </form>
      </div>
    </div>
  );
}
function AppShell({ data, isLoading, isError, error, categoryData, totalRevenue, openEdit, mutate, editingItemId, setEditingItemId, editingItem, handleSubmit, register, editSubmitHandler }) {
  const logout = useAuthStore((state) => state.logout);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { title, subtitle } = pageTitles[location.pathname] ?? pageTitles["/"];

  return (
    <div dir="rtl" className="min-h-screen flex" style={{ background: "#11151f", fontFamily: "'Vazirmatn', 'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 flex-shrink-0 flex flex-col py-6 px-4 fixed lg:static inset-y-0 right-0 z-50 transition-transform ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        style={{ background: "#1b2230", borderLeft: "1px solid #2a3140" }}
      >
        <div className="flex items-center justify-between px-2 mb-10">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${ACCENT.teal}, ${ACCENT.amber})`, color: "#11151f" }}
            >
              O
            </div>
            <span className="text-slate-50 font-semibold text-lg tracking-tight">
              OMID Shop<span style={{ color: ACCENT.teal }}>panel</span>
            </span>
          </div>
          <button className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(false)} aria-label="بستن منو">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative"
                style={active ? { background: `${ACCENT.teal}1f`, color: ACCENT.teal, boxShadow: `inset 0 0 0 1px ${ACCENT.teal}44` } : { color: "#8a93a6" }}
              >
                <Icon size={18} />
                {item.label}
                {active && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full" style={{ background: ACCENT.teal }} />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="rounded-xl p-4 mb-3" style={{ background: "#11151f", border: `1px solid ${ACCENT.amber}33` }}>
            <p className="text-xs text-slate-500 mb-1">پلن فعلی</p>
            <p className="text-sm font-medium" style={{ color: ACCENT.amber }}>نسخه حرفه‌ای</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/log-in");
            }}
          >
            <LogOut size={18} />
            خروج از حساب
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 sm:px-8 py-5 flex-shrink-0" style={{ borderBottom: "1px solid #2a3140" }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-slate-300" onClick={() => setSidebarOpen(true)} aria-label="باز کردن منو">
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-slate-50 text-lg sm:text-xl font-semibold">{title}</h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            <button className="w-10 h-10 rounded-xl flex items-center justify-center relative" style={{ border: "1px solid #2a3140" }} aria-label="اعلان‌ها">
              <Bell size={17} className="text-slate-300" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: ACCENT.rose }} />
            </button>
            <Link to="/" className="w-10 h-10 rounded-xl flex items-center justify-center font-medium text-sm" style={{ background: `${ACCENT.rose}1f`, color: ACCENT.rose, border: `1px solid ${ACCENT.rose}44` }} aria-label="پروفایل">
              O
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  data={data} isLoading={isLoading} isError={isError} error={error}
                  categoryData={categoryData} totalRevenue={totalRevenue}
                  openEdit={openEdit} mutate={mutate}
                />
              }
            />
            <Route
              path="/products"
              element={<ProductsPage data={data} isLoading={isLoading} isError={isError} error={error} openEdit={openEdit} mutate={mutate} />}
            />
            <Route path="/CartItem" element={<CartItem />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>

      {/* Edit modal */}
      {editingItemId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: "rgba(5,7,12,0.7)" }}>
          <div className="w-full max-w-md rounded-2xl p-6 relative" style={{ background: "#1b2230", border: "1px solid #2a3140" }}>
            <button
              onClick={() => setEditingItemId(null)}
              className="absolute top-5 left-5 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors"
              style={{ border: "1px solid #2a3140" }}
              aria-label="بستن"
            >
              <X size={15} />
            </button>

            <h3 className="text-slate-50 font-medium mb-1">ویرایش محصول</h3>
            <p className="text-slate-500 text-xs mb-5">{editingItem?.title}</p>

            <form onSubmit={handleSubmit(editSubmitHandler)} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">عنوان</label>
                <input className="w-full rounded-xl px-3 py-2.5 text-sm text-slate-100 bg-transparent outline-none focus:ring-1 transition-all" style={{ border: "1px solid #2a3140" }} type="text" {...register("title")} />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">توضیحات</label>
                <textarea rows={3} className="w-full rounded-xl px-3 py-2.5 text-sm text-slate-100 bg-transparent outline-none focus:ring-1 transition-all resize-none" style={{ border: "1px solid #2a3140" }} {...register("description")} />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">قیمت ($)</label>
                <input className="w-full rounded-xl px-3 py-2.5 text-sm text-slate-100 bg-transparent outline-none focus:ring-1 transition-all" style={{ border: "1px solid #2a3140" }} type="text" {...register("price")} />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-xl py-2.5 text-sm font-medium transition-transform active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${ACCENT.teal}, ${ACCENT.amber})`, color: "#11151f" }}
              >
                ذخیره تغییرات
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPanelInner() {
  const [editingItemId, setEditingItemId] = useState(null);
  const queryClient = useQueryClient()
  const token = useAuthStore((state) => state.token);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  const { handleSubmit, register, reset } = useForm();

  const { mutate } = useMutation({
    mutationFn: (id) => fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" }).then((res) => res.json()),
onSuccess: () => {
    queryClient.invalidateQueries({
        queryKey:["products"]
    })
}, onError: (err) => console.error(err),

  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: async ({ id, newData }) => {
      const token = localStorage.getItem("token")
      return await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newData),
      }).then((res) => res.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
      })     
       setEditingItemId(null);
      { alert("eddit is sucsses") };
    },
    onError: (err) => console.error(err),
  });

  const editSubmitHandler = (formData) => updateMutate({ id: editingItemId, newData: formData });

  const editingItem = useMemo(() => data?.find((p) => p.id === editingItemId), [data, editingItemId]);

  const openEdit = (item) => {
    reset({ title: item.title, description: item.description, price: item.price });
    setEditingItemId(item.id);
  };

  const categoryData = useMemo(() => {
    if (!data) return [];
    const counts = {};
    data.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    const colors = [ACCENT.teal, ACCENT.amber, ACCENT.rose, ACCENT.rust];
    return Object.entries(counts).map(([name, value], i) => ({ name, value, color: colors[i % colors.length] }));
  }, [data]);

  const totalRevenue = fakeWeeklySales.reduce((s, d) => s + d.sales, 0);

  return (
    <AppShell
      data={data} isLoading={isLoading} isError={isError} error={error}
      categoryData={categoryData} totalRevenue={totalRevenue}
      openEdit={openEdit} mutate={mutate}
      editingItemId={editingItemId} setEditingItemId={setEditingItemId} editingItem={editingItem}
      handleSubmit={handleSubmit} register={register} editSubmitHandler={editSubmitHandler}
    />
  );
}

export default function AdminPanel() {
  return (

    <AdminPanelInner />

  );
}
