"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Pagination from "../_components/Pagination";
import { api } from "~/trpc/react";
import { useGlobalStore } from "../store";

const pageSize = 6;

export default function Interests() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const globalStore = useGlobalStore((state) => state);

  React.useEffect(() => {
    if (!globalStore.isAuth) {
      router.replace("/login");
    }
  }, [globalStore.isAuth, router]);

  const { data } = globalStore.isAuth
    ? api.user.getInterests.useQuery({ pageNumber: currentPage, pageSize })
    : { data: null };

  const { data: chkInterest } =
    globalStore.userId !== null
      ? api.user.getUserInterests.useQuery({ userId: globalStore.userId })
      : { data: null };

  React.useEffect(() => {
    if (chkInterest?.success) {
      const keys = Object.keys(chkInterest.interestsObj);
      keys.forEach((key) => globalStore.userInterests[key] = true);
    }
  }, [chkInterest, globalStore.userInterests]);

  const updateInterest = api.user.updateInterests.useMutation();

  return (
    <div className="m-auto mt-[4.5rem] min-w-[520px] max-w-[27%] rounded-xl border bg-white px-3 py-10 shadow-lg">
      <div className="text-center">
        <p className="text-3xl font-semibold">Please mark your interests!</p>
      </div>
      <div className="mt-4 text-center">
        <p className="">We will keep you notified.</p>
      </div>
      <div className="p-5">
        <div className="mt-4">
          <p className="font-semibold">My saved interests!</p>
        </div>
        <div>
          {data?.interests?.map((d) => (
            <div
              className="align-center my-5 flex items-start space-x-2 text-sm"
              key={d.productId}
            >
              <input
                type="checkbox"
                checked={globalStore.userInterests[d.productId] ?? chkInterest?.interestsObj[d.productId] ?? false}
                className="h-4 w-4 rounded border-gray-300 accent-black"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const isChecked: boolean = target.checked;
                  globalStore.userInterests[d.productId] = target.checked;
                  updateInterest.mutate({
                    productId: d.productId,
                    userId: globalStore.userId!,
                    check: isChecked, // Pass the boolean value here
                  });
                }}
              />
              <div className="flex flex-col">
                <p className="leading-none">{d.productName}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={4} />
      </div>
    </div>
  );
}
