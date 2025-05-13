'use client'

import { Suspense, useEffect, useState } from "react"
import BrandsTemplate from "./brands.html"
import { useBrands } from "@/hooks/erp/useBrands"
import { Brand } from "@/lib/interfaces"

const BrandsPage = () => {
  const [marcas, setBrands] = useState<Brand[]>([])
  const [status, setStatus] = useState("")
  const { getBrands } = useBrands()

  useEffect(() => {
    getBrands().then(data => {
      setBrands(data)
    })
    setTimeout(() => {
      setStatus("")
    }, 5000)
  }, [getBrands])

  if (marcas.length === 0) {
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    )
  }

  return (
    <Suspense>
      <BrandsTemplate data={{ marcas, status, setStatus }} />
    </Suspense>
  )
}

export default BrandsPage
