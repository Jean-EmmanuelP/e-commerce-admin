"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Nav from '@/components/nav.jsx'

export default function Home() {
  const { data: session, status } = useSession();
  if (status !== "authenticated") {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button  onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg text-black">
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white text-black flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">Logged in {session!.user!.email}</div>
    </div>
  )
}
