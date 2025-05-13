// Archivo: useWarehouses.ts - Hook para obtener la lista de almacenes

import { useState, useEffect } from "react"
import axiosClient from "@/lib/axiosClient"
import { Warehouse } from "@/lib/interfaces"

export const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getWarehouses = async () => {
    setLoading(true)
    try {
      const res = await axiosClient.get("/api/warehouses")
      setWarehouses(res.data.data)
    } catch (err: any) {
      setError("No se pudieron obtener los almacenes.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWarehouses()
  }, [])

  return { warehouses, loading, error }
}
