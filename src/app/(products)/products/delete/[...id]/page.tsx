"use client";

import Layout from "@/components/Layout";
import axios, { AxiosResponse } from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<any>();
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/api/products?id=${id}`)
      .then((response: AxiosResponse<any, any>) => {
        setProductInfo(response.data);
      });
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete(`/api/products?id=${id}`)
    goBack()
  }

  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete &nbsp;"{productInfo?.title}"?</h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="btn-red">
            Yes
            </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
