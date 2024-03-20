'use client';
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import OTPField from "../OTPField";
import React, { useState } from "react";
import { useGlobalStore } from "~/app/store";

export default function Verify({ params }: {
  params: { tokenId: string },
}) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const globalStore = useGlobalStore((state) => state);

  React.useEffect(() => {
    if (globalStore.lastUrl !== 'register') {
      router.replace("/register");
    }
  }, [globalStore.lastUrl, router]);

  const verifyUser = api.user.verify.useMutation({
    onSuccess: (res) => {
      router.refresh();
      if (res.success) {
        router.replace('/interests')
        globalStore.updateAuth(true);
        globalStore.updateUserId(res.userId!);
      }
    },
  });
  return (
    <div className="max-w-[27%] min-w-[520px] m-auto mt-[4.5rem] px-3 py-10 bg-white shadow-lg rounded-xl border">
      <div className="text-center">
        <p className="text-3xl font-semibold">Verify your email</p>
      </div>
      <div className="text-center mt-4">
        <p className="">Enter the 8 digit code you have received on</p>
      </div>
      <div className="text-center mt-1">
        <p className="text-sm font-semibold">swa***@gmail.com</p>
      </div>
      <div className="px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Code
          </label>
          <OTPField otp={otp} setOtp={setOtp} />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-[100%] bg-black hover:bg-slate-800 transition-all uppercase text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline leading-relaxed text-sm tracking-wide"
            type="button"
            onClick={() => {
              const strOtp = otp.join('');
              if (strOtp.length === 8) {
                verifyUser.mutate({
                  otp: strOtp,
                  token: params.tokenId,
                });
              }
            }}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
