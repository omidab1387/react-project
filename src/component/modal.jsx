import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Modal() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const show = localStorage.getItem("welcom");
        if (!show) {
            setOpen(true);
        }
    }, []);
    const closeModal = () => {
        localStorage.setItem("welcom", "true");
        setOpen(false);
    };
    const handleRegister = () => {
        localStorage.setItem("welcom", "true");
        setOpen(false);
    };
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-2">
            <div className="relative w-[75%] max-md:w-[90%] bg-white rounded-xl p-6">
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-[44px] cursor-pointer"
                >
                    ×
                </button>

                <div className="mb-6 text-center ">
                    به سایت من خوش امدی        
                    </div>

              
                <button
                    onClick={closeModal}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                >
                    متوجه شدم
                </button>
             <Link to={'log-in'}>
                    <button
                        className=" block bg-blue-600 font-bold  px-5 py-2 my-3 rounded-lg   hover:bg-red-900 transition durration-7000 "
                        onClick={closeModal}
                    >
                        ثبت نام
                    </button>
          </Link>
            </div>
        </div>
    );
}
