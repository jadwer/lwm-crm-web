// Archivo: WarehouseLocationTable.tsx - Tabla con creación, edición y eliminación

'use client'

import { useState } from 'react'
import { WarehouseLocation } from '@/lib/interfaces'
import WarehouseLocationForm from './WarehouseLocationForm'
import { useWarehouseLocations } from '@/hooks/inventory/useWarehouseLocations'

const WarehouseLocationTable = () => {
  const {
    locations,
    createLocation,
    updateLocation,
    deleteLocation
  } = useWarehouseLocations()

  const [editingLocation, setEditingLocation] = useState<WarehouseLocation | null>(null)
  const [creating, setCreating] = useState(false)
  const [updating, setUpdating] = useState(false)

  const handleCreate = async (data: Partial<WarehouseLocation>) => {
    setCreating(true)
    try {
      await createLocation(data)
    } catch (e) {
      alert('Error al crear la ubicación.')
    } finally {
      setCreating(false)
    }
  }

  const handleUpdate = async (data: Partial<WarehouseLocation>) => {
    if (!editingLocation) return
    setUpdating(true)
    try {
      await updateLocation(editingLocation.id, data)
      setEditingLocation(null)
    } catch (e) {
      alert('Error al actualizar la ubicación.')
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro de eliminar esta ubicación?')
    if (!confirm) return
    try {
      await deleteLocation(id)
    } catch (e) {
      alert('No se pudo eliminar la ubicación.')
    }
  }

  return (
    <div>
      {/* Formulario para crear nueva ubicación */}
      <div className="mb-6 border p-4 rounded-xl bg-gray-50">
        <WarehouseLocationForm onSubmit={handleCreate} loading={creating} />
      </div>

      {/* Formulario para editar ubicación existente */}
      {editingLocation && (
        <div className="mb-6 border p-4 rounded-xl bg-gray-50">
          <WarehouseLocationForm
            location={editingLocation}
            onSubmit={handleUpdate}
            loading={updating}
          />
        </div>
      )}

      {/* Tabla de ubicaciones */}
      <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Almacén</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{location.id}</td>
                <td className="px-6 py-3">{location.name}</td>
                <td className="px-6 py-3">{location.type ?? '—'}</td>
                <td className="px-6 py-3">{location.warehouse?.name ?? '—'}</td>
                <td className="px-6 py-3 text-center space-x-4">
                  <button
                    onClick={() => setEditingLocation(location)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
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

export default WarehouseLocationTable
