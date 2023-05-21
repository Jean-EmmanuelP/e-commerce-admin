'use client'

import Layout from "@/components/Layout";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function newProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProducts, setGoToProducts] = useState(false)

  async function createProduct(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const data = { title, description, price }
    await axios.post('/api/products', data)
    setGoToProducts(true)
  }

  if (goToProducts) {
    return redirect('/products')
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </Layout>
  );
}
