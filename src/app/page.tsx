"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "@/components/Layout.jsx";
import { notFound } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>Hello, {session?.user?.email}</h2>
        <div className="flex bg-gray-300 text-black gap-1">
          <img
            src={session?.user?.image as string}
            alt=""
            className="w-6 h-6"
          />
          {session?.user?.name}
        </div>
      </div>
    </Layout>
  );
}
