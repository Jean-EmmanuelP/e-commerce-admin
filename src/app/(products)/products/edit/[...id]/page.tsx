"use client";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductsForm";
import axios from "axios";
import { usePathname } from "next/navigation"; // Assuming usePathname is a custom hook
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const pathname = usePathname();
  const id = pathname?.split("/").pop(); // `pop` extrait le dernier élément du tableau
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/products?id=${id}`).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit Product</h1>
      <ProductForm {...productInfo} />
    </Layout>
  );
}
