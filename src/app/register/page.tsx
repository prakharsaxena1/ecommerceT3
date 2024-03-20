"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useGlobalStore } from "../store";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const globalStore = useGlobalStore((state) => state);

  const registerUser = api.user.register.useMutation({
    onSuccess: (res) => {
      router.refresh();
      if (res.success) {
        router.replace(`/verify/${res.token}`)
        globalStore.lastUrl = 'register';
      }
    },
  });
  return (
    <div className="max-w-[27%] min-w-[520px] m-auto mt-[4.5rem] px-3 py-10 bg-white shadow-lg rounded-xl border">
      <div className="text-center">
        <p className="text-3xl font-semibold">Create you account</p>
      </div>
      <div className="px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-[100%] bg-black hover:bg-slate-800 transition-all uppercase text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline leading-relaxed text-sm tracking-wide"
            type="button"
            onClick={() => {
              registerUser.mutate({ name, email, password });
            }}
          >
            Create Account
          </button>
        </div>
        <div className="flex items-center flex-row gap-2 justify-center mt-[3rem]">
          <p>Have an Account?</p>
          <span className="font-bold uppercase">
            <Link href="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
