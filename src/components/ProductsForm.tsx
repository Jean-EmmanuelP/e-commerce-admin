"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { ReactSortable } from "react-sortablejs";

interface ProductFormProps {
  _id?: string;
  title?: string | null;
  description?: string | null;
  price?: number | null;
  images: any;
  category: string | null;
}

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
}: ProductFormProps) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory ||"");
  const [price, setPrice] = useState(existingPrice || 0);
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  async function saveProduct(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = { title, description, price, images, category };
    if (_id) {
      // update
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    return redirect("/products");
  }

  async function uploadImages(ev: React.ChangeEvent<HTMLInputElement>) {
    const { files } = ev.target;

    if (files!.length > 0) {
      setIsUploading(true);
      const fileList = Array.from(files!);
      const data = new FormData();
      fileList.forEach(async (file: File) => {
        data.append("file", file);
      });
      const res = await axios.post("/api/upload", data);
      setImages((oldImages: any) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
      console.log(res.data);
    }
  }

  function updateImagesOrder(images: any) {
    setImages(images);
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c: any) => <option value={c._id}>{c.name}</option>)}
      </select>
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link: any) => (
              <div key={link} className="h-24">
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 p-1 bg-gray-200 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 border text-center cursor-pointer flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
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
        onChange={(ev) => setPrice(Number(ev.target.value))}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
