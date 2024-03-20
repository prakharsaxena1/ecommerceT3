import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/login"><p className="mx-auto px-3 py-2 m-1 w-[120px] bg-slate-200 hover:text-white hover:bg-slate-400">Login</p></Link>
      <Link href="/register"><p className="mx-auto px-3 py-2 m-1 w-[120px] bg-slate-200 hover:text-white hover:bg-slate-400">Register</p></Link>
      <Link href="/interests"><p className="mx-auto px-3 py-2 m-1 w-[120px] bg-slate-200 hover:text-white hover:bg-slate-400">Interests</p></Link>
      <Link href="/verify/1111"><p className="mx-auto px-3 py-2 m-1 w-[120px] bg-slate-200 hover:text-white hover:bg-slate-400">Verify</p></Link>
    </main>
  );
}
