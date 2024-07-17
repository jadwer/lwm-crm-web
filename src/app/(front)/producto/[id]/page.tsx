'use client'
import { Suspense, useEffect, useState } from "react";
import ProductoTemplate from "./producto.html";
import { useProducts } from "@/hooks/products";

const ProductoPage = ({params} : {params : { id : number}}) => {
  const [producto, setProducto] = useState([]);

  const {id} = params;
  const { getProduct } = useProducts();
  

  useEffect(() => {
    getProduct({id, setProducto});
  }, []);

  
  if(Object.keys(producto).length === 0){
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    )
  } else {
    return (
      <Suspense>
        {<ProductoTemplate data={{producto}}/>}
      </Suspense>
    )
  }
}

export default ProductoPage
