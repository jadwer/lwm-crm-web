'use client'

import { Suspense, useEffect, useState } from "react";
import { useCategories } from "@/hooks/categories";
import { Category } from "@/lib/interfaces";

import CategoriesTemplate from "./categories.html"

const CategoriesPage = () => {
  const [categorias, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState("");
  const { getCategories } = useCategories();
  
  useEffect(() => {
    getCategories( {setCategories} );
    setTimeout(()=>{setStatus("")}, 5000);
  }, [status]);

  if(Object.keys(categorias).length === 0){
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    )
  } else {
    return (
  <Suspense>
    <CategoriesTemplate data={{categorias, status, setStatus}} />
  </Suspense>
  )
}
}

export default CategoriesPage
