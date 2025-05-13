// Archivo: useStock.ts - Hook para obtener el stock por producto

import { useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { Stock } from "@/lib/interfaces"

export const useStock = () => {
  const [stockData, setStockData] = useState<Stock[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getStock = async () => {
    setLoading(true)
    try {
      const res = await axiosClient.get("/api/stock")
      setStockData(res.data.data)
    } catch (err: any) {
      setError("No se pudo obtener el stock.")
    } finally {
      setLoading(false)
    }
  }

  return { stockData, loading, error, getStock }
}
