"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "@/components/Layout.jsx";

export default function Home() {
  return <Layout>Test</Layout>;
}
