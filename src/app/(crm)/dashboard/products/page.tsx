'use client'
import { Suspense, useEffect, useState } from "react"
import { Brand, Category, Products, Unit } from "@/lib/interfaces";
import ProductsTemplate from "./products.html"
import { useProducts } from "@/hooks/products";




const ProductsPage = () => {
  const {getAllProducts} = useProducts();

  const [productos, setProductos] = useState<Products[]>([]);

  useEffect(() => {
    getAllProducts({setProductos});
  // eslint-disable-next-line react-hooks/exhaustive-deps
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