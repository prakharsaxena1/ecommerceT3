import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { Cart, Search } from "./_components/Icons";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECOMMERCE",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-end">
                <div className="flex flex-row gap-3 text-sm">
                  <span className="ml-2">Help</span>
                  <span className="ml-2">Orders & Returns</span>
                  <span className="ml-2">Hi, John</span>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">ECOMMERCE</p>
                </div>
                <div>
                  <div className="flex flex-row gap-5 font-bold text-lg">
                    <span>Categories</span>
                    <span>Sales</span>
                    <span>Clearance</span>
                    <span>New Stock</span>
                    <span>Trending</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-6">
                    <span>
                      <Search />
                    </span>
                    <span>
                      <Cart />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="m-auto flex flex-row gap-5 w-auto justify-center p-1">
                <span>&lt;</span>
                <span>Get 10% off on business sign up</span>
                <span>&gt;</span>
              </div>
            </div>
            <TRPCReactProvider>
              {children}
            </TRPCReactProvider>
          </div>
        </main>
      </body>
    </html>
  );
}