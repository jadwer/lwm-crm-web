'use client'
import BrandsTemplate from "./brands.html"
import { Suspense, useEffect, useState } from "react";
import { useBrands } from "@/hooks/brands";
import { Brand } from "@/lib/interfaces";

const BrandsPage = () => {
  const [marcas, setBrands] = useState<Brand[]>([]);
  const [status, setStatus] = useState("");
  const { getBrands } = useBrands();
  
  useEffect(() => {
    getBrands( {setBrands} );
    setTimeout(()=>{setStatus("")}, 5000);
  }, [status]);

  if(Object.keys(marcas).length === 0){
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    )
  } else {
    return (
  <Suspense>
    <BrandsTemplate data={{marcas, status, setStatus}} />
  </Suspense>
  )
}
}

export default BrandsPage