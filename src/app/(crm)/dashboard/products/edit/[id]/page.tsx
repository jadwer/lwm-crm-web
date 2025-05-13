"use client";
import { Product } from "@/lib/interfaces";
import EditProductTemplate from "../../components/EditProductTemplate";
import { useProducts } from "@/hooks/products";
import { Suspense, useEffect, useState } from "react";

const EditProductPage = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const [producto, setProducto] = useState<Product>({} as Product);
  const { getProduct } = useProducts();

  useEffect(() => {
    getProduct({ id, setProducto });
  }, []);

  if (Object.keys(producto).length === 0) {
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    );
  } else {
    return (
      <Suspense>
        <EditProductTemplate producto={producto} />;
      </Suspense>
    );
  }
};

export default EditProductPage;