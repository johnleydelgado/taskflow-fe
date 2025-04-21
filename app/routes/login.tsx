/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// app/routes/login.tsx
import { useState } from "react";
import { Form, redirect, useActionData, useNavigate, type ClientActionFunctionArgs } from "react-router";
import { useLoginUser } from "~/api/user.query";
import type { UserLogin } from "~/api/user.types";
import { LazyLottie } from "~/utils/LazyTottie";
import { getUser, makeUserCookie } from "~/utils/session";

export async function clientLoader() {
  if (getUser()) throw redirect("/");
  return null;
}

// export async function clientAction({ request }: ClientActionFunctionArgs) {
//   const formData = await request.formData();
//   const email = (formData.get("email") as string)?.trim();
//   if (!email) return { error: "email required" };
//   document.cookie = makeUserCookie(email);
//   throw redirect("/");
// }

export default function Login() {
  // const data = useActionData<typeof clientAction>();
  const loginMutation = useLoginUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = (form.get("email") as string)?.trim();
    const password = (form.get("password") as string)?.trim();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data:UserLogin) => {
          // You can store token in cookie/localStorage here if needed
          // document.cookie = makeUserCookie(data.user.email); ← optional
          document.cookie = makeUserCookie(data.user.email);
          navigate("/"); // redirect to home
        },
        onError: (err: any) => {
          setError(err.response.data.error || "Login failed");
        },
      }
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10">
        <div className="max-w-sm w-full mx-auto space-y-6">
          <h1 className="text-4xl font-bold mb-2">Login</h1>
          <p className="text-sm text-gray-400">Enter your account details</p>

          <Form className="space-y-4" onSubmit={handleSubmit} >
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            />

            <label className="block text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            />

            <div className="text-right">
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-brand-500 hover:bg-brand-700 transition rounded-md font-medium"
            >
              Login
            </button>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </Form>

          <div className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <button className="ml-2 py-1 px-3 bg-gray-800 hover:bg-gray-700 rounded-md text-white">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 relative bg-main-9">
        <div className="absolute top-20 left-16 max-w-md">
          <h2 className="text-7xl font-extrabold leading-tight">Welcome to</h2>
          <h3 className="text-4xl font-medium leading-tight mb-3">manager portal</h3>
          <p className="text-sm text-white/90">Login to access your account</p>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900/50">
          <LazyLottie
            id="manager-hero"
            getJson={() => import("~/assets/lottie/manager.json")}
            loop
            className="absolute bottom-7 left-1/2 -translate-x-1/2 w-[30rem] sm:w-[38rem] lg:w-[44rem]"
          />
        </div>
      </div>
    </div>
  );
}
