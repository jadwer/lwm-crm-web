// Archivo: useWarehouseLocations.ts - Hook para obtener ubicaciones de almacén

import { useState, useEffect } from "react"
import axiosClient from "@/lib/axiosClient"
import { WarehouseLocation } from "@/lib/interfaces"

export const useWarehouseLocations = () => {
  const [locations, setLocations] = useState<WarehouseLocation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getLocations = async () => {
    setLoading(true)
    try {
      const res = await axiosClient.get("/api/warehouse-locations")
      setLocations(res.data.data)
    } catch (err: any) {
      setError("No se pudieron obtener las ubicaciones.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLocations()
  }, [])

  return { locations, loading, error }
}
