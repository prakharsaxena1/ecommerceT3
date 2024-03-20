'use client';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import React, { useState } from 'react';
import { api } from '~/trpc/react';
import { useGlobalStore } from "../store";

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const globalStore = useGlobalStore((state) => state);

  const loginUser = api.user.login.useMutation({
    onSuccess: (res) => {
      if (res.success) {
        router.replace('/interests');
        globalStore.updateAuth(true);
        globalStore.updateUserId(res.userId!);
      }
    }
  });
  return (
    <div className="max-w-[27%] min-w-[520px] m-auto mt-[4.5rem] px-3 py-10 bg-white shadow-lg rounded-xl border">
      <div className="text-center">
        <p className="text-3xl font-semibold">Login</p>
      </div>
      <div className="text-center mt-4">
        <p className="text-2xl font-semibold">Welcome back to ECOMMERCE</p>
      </div>
      <div className="text-center mt-2">
        <p>The next gen business marketplace</p>
      </div>
      <div className="px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="button" className='underline absolute text-xs top-3 right-2 hover:bg-slate-200 p-1 rounded-sm' onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-[100%] bg-black hover:bg-slate-800 transition-all uppercase text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline leading-relaxed text-sm tracking-wide"
            type="button"
            onClick={() => {
              if (email !== '' && password !== '') {
                loginUser.mutate({ email, password });
              }
            }}
          >
            Login
          </button>
        </div>
        <div className="flex items-center flex-row gap-2 justify-center mt-[3rem]">
          <p>Don&apos;t have an Account?</p>
          <span className="font-bold uppercase">
            <Link href="/register">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
