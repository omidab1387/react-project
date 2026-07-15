import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthStore from "./authStore";

export default function LogIn() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "نام کاربری یا رمز عبور اشتباه است");
      }

      return await res.json();
    },

    onSuccess: (data) => {
      setLoginError("");
      login(data.token);
      navigate("/admin-panel");
    },

    onError: () => {
      setLoginError("نام کاربری یا رمز عبور اشتباه است");
    },
  });

  const handleLogin = (data) => {
    setLoginError("");
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          ورود
        </h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label>نام کاربری</label>

            <input
              type="text"
              className="w-full border rounded p-2"
              {...register("username", {
                required: "نام کاربری الزامی است",
              })}
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label>رمز عبور</label>

            <input
              type="password"
              className="w-full border rounded p-2"
              {...register("password", {
                required: "رمز عبور الزامی است",
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {loginError && (
              <p className="text-red-500 text-sm mt-2">
                {loginError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {isPending ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}