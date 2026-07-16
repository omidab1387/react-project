import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import useAuthStore from "./authStore";
import { loginUser } from "./services";

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
    mutationFn: loginUser,

    onSuccess: (data) => {
      setLoginError("");
      login(data.token);
      navigate("/admin-panel");
    },

    onError: (error) => {
      setLoginError(
        error.message || "نام کاربری یا رمز عبور اشتباه است"
      );
    },
  });

  const handleLogin = (formData) => {
    setLoginError("");
    mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          ورود
        </h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block mb-1">نام کاربری</label>

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
            <label className="block mb-1">رمز عبور</label>

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
          </div>

          {loginError && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPending ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}