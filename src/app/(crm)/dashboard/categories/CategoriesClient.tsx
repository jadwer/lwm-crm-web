// Archivo: src/app/(crm)/dashboard/categories/CategoriesClient.tsx

'use client'

import { Suspense, useEffect, useState } from "react"
import { useCategories } from "@/hooks/erp/useCategories"
import { Category } from "@/lib/interfaces"
import CategoriesTemplate from "./CategoriesTemplate"

const CategoriesClient = () => {
  const [categorias, setCategorias] = useState<Category[]>([])
  const [status, setStatus] = useState("")
  const { getCategories } = useCategories()

  useEffect(() => {
    getCategories().then(data => {
      if (Array.isArray(data)) {
        setCategorias(data)
      }
    })
    const timeout = setTimeout(() => setStatus(""), 5000)
    return () => clearTimeout(timeout)
  }, [getCategories])

  return (
    <Suspense fallback={<p>Cargando categorías...</p>}>
      <CategoriesTemplate data={{ categorias, status, setStatus }} />
    </Suspense>
  )
}

export default CategoriesClient
