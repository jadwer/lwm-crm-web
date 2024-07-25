'use client'
import { Suspense, useEffect, useState } from "react";
import { useUnits } from "@/hooks/units";
import { Unit } from "@/lib/interfaces";

import UnitsTemplate from "./units.html"

const UnitsPage = () => {
  const [unidades, setUnits] = useState<Unit[]>([]);
  const [status, setStatus] = useState("");
  const { getUnits } = useUnits();
  
  useEffect(() => {
    getUnits( {setUnits} );
    setTimeout(()=>{setStatus("")}, 5000);
  }, [status]);

  if(Object.keys(unidades).length === 0){
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    )
  } else {
    return (
  <Suspense>
    <UnitsTemplate data={{unidades, status, setStatus}} />
  </Suspense>
  )
}
}

export default UnitsPage
