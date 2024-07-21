'use client'

import { Suspense, useEffect, useState } from "react"
import ProductsTemplate from "./products.html"
import { useProducts } from "@/hooks/products";
import { Products } from "@/lib/interfaces";


const ProductsPage = () => {
  const [productos, setProductos] = useState<Products[]>([]);
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
    
    return (
      <Suspense>
        <ProductsTemplate data={{productos}}/>
      </Suspense>
    )
  }
}

export default ProductsPage