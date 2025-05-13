// Archivo: useProductBatches.ts - Hook para obtener lotes (batches) de un producto

import { useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { ProductBatch } from "@/lib/interfaces"

export const useProductBatches = () => {
  const [batches, setBatches] = useState<ProductBatch[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProductBatches = async (productId: number) => {
    setLoading(true)
    try {
      const res = await axiosClient.get(`/api/product-batches?product_id=${productId}`)
      setBatches(res.data.data)
    } catch (err: any) {
      setError("No se pudieron obtener los lotes del producto.")
    } finally {
      setLoading(false)
    }
  }

  

  const deleteProductBatch = async (id: number) => {
    try {
      await axiosClient.delete(`/api/product-batches/${id}`)
    } catch (err: any) {
      throw new Error("No se pudo eliminar el lote.")
    }
  }

  return { batches, loading, error, getProductBatches, deleteProductBatch }
}
