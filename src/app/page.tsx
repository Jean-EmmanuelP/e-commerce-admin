"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "@/components/Layout.jsx";
import { notFound } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>Hello, <b>{session?.user?.email}</b></h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img
            src={session?.user?.image as string}
            alt=""
            className="w-6 h-6"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
