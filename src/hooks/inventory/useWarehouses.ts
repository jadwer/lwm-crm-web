// Archivo: useWarehouses.ts - Hook para gestionar almacenes (listar, crear, editar, eliminar)

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

  const createWarehouse = async (data: Partial<Warehouse>) => {
    await axiosClient.post("/api/warehouses", data)
    await getWarehouses()
  }

  const updateWarehouse = async (id: number, data: Partial<Warehouse>) => {
    await axiosClient.put(`/api/warehouses/${id}`, data)
    await getWarehouses()
  }

  const deleteWarehouse = async (id: number) => {
    await axiosClient.delete(`/api/warehouses/${id}`)
    await getWarehouses()
  }

  useEffect(() => {
    getWarehouses()
  }, [])

  return {
    warehouses,
    loading,
    error,
    getWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
  }
}
