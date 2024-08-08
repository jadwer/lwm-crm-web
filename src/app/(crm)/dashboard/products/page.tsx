'use client'
import { Suspense, useEffect, useState } from "react"
import { Brand, Category, Products, Unit } from "@/lib/interfaces";
import ProductsTemplate from "./products.html"
import { useProducts } from "@/hooks/products";

const ProductsPage = () => {
  const {getFilteredProducts} = useProducts();
  
  const [productos, setProductos] = useState<Products[]>([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    getFilteredProducts({setProductos}, searchFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  const searchQueryBuilder = (e : Event, id : string) => {
    setSearchFilter(id);
  }


  if(Object.keys(productos).length === 0){
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    )
  } else {
    return (
      <Suspense>
        <ProductsTemplate data={{productos}} functions={ {searchQueryBuilder} }/>
      </Suspense>
    )
  }
}

export default ProductsPage