'use client'

import { Suspense, useEffect, useState } from "react"
import ProductsTemplate from "./products/products.html"
import { useProducts } from "@/hooks/products";

const DashboardPage = () => {
  const [productos, setProductos] = useState([]);
  const {getAllProducts} = useProducts();

  useEffect(() => {
    getAllProducts({setProductos});
  }, []);

  if(Object.keys(productos).length === 0){
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    )
  } else {
    console.log(typeof(productos))
    return (
      <Suspense>
        <ProductsTemplate data={{productos}}/>
      </Suspense>
    )
  }
}

export default DashboardPage