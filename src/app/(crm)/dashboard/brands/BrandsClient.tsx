// Archivo: src/app/(crm)/dashboard/brands/BrandsClient.tsx

'use client'

import { Suspense, useEffect, useState } from "react"
import { useBrands } from "@/hooks/erp/useBrands"
import { Brand } from "@/lib/interfaces"
import BrandsTemplate from "./BrandsTemplate"

const BrandsClient = () => {
  const [marcas, setMarcas] = useState<Brand[]>([])
  const [status, setStatus] = useState("")
  const { getBrands } = useBrands()

  useEffect(() => {
    getBrands().then(setMarcas)
    const timeout = setTimeout(() => setStatus(""), 5000)
    return () => clearTimeout(timeout)
  }, [getBrands])

  return (
    <Suspense fallback={<h4>Cargando marcas...</h4>}>
      <BrandsTemplate data={{ marcas, status, setStatus }} />
    </Suspense>
  )
}

export default BrandsClient
