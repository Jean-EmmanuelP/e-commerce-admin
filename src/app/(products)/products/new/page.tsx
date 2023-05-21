"use client";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductsForm";

export default function newProduct() {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
