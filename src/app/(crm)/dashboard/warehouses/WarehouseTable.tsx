// Archivo: WarehouseTable.tsx - Tabla para listar almacenes con edición y eliminación

'use client'

import { useState } from 'react'
import { Warehouse } from '@/lib/interfaces'
import WarehouseForm from './WarehouseForm'
import { useWarehouses } from '@/hooks/inventory/useWarehouses'

const WarehouseTable = () => {
  const { warehouses, updateWarehouse, deleteWarehouse } = useWarehouses()
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (data: Partial<Warehouse>) => {
    if (!editingWarehouse) return
    setLoading(true)
    try {
      await updateWarehouse(editingWarehouse.id, data)
      setEditingWarehouse(null)
    } catch (e) {
      alert('Error al actualizar el almacén.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este almacén?')
    if (!confirm) return
    try {
      await deleteWarehouse(id)
    } catch (e) {
      alert('No se pudo eliminar el almacén.')
    }
  }

  return (
    <div>
      {editingWarehouse && (
        <div className="mb-6 border p-4 rounded-xl bg-gray-50">
          <WarehouseForm
            warehouse={editingWarehouse}
            onSubmit={handleUpdate}
            loading={loading}
          />
        </div>
      )}

      <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Ubicación</th>
              <th className="px-6 py-3">Notas</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{warehouse.id}</td>
                <td className="px-6 py-3">{warehouse.name}</td>
                <td className="px-6 py-3">{warehouse.location ?? '—'}</td>
                <td className="px-6 py-3">{warehouse.notes ?? '—'}</td>
                <td className="px-6 py-3 text-center space-x-4">
                  <button
                    onClick={() => setEditingWarehouse(warehouse)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(warehouse.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WarehouseTable
