// Archivo: WarehouseLocationForm.tsx - Formulario para registrar o editar ubicaciones

'use client'

import { useEffect, useState } from 'react'
import { WarehouseLocation } from '@/lib/interfaces'
import { useWarehouses } from '@/hooks/inventory/useWarehouses'

interface Props {
  location?: WarehouseLocation
  onSubmit: (data: Partial<WarehouseLocation>) => void
  loading?: boolean
}

const WarehouseLocationForm = ({ location, onSubmit, loading }: Props) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [warehouseId, setWarehouseId] = useState(0)
  const { warehouses } = useWarehouses()

  useEffect(() => {
    if (location) {
      setName(location.name || '')
      setType(location.type || '')
      setWarehouseId(location.warehouse_id || 0)
    }
  }, [location])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, type, warehouse_id: warehouseId })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">{location ? 'Editar ubicación' : 'Nueva ubicación'}</h2>

      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Tipo</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Almacén asociado</label>
        <select
          value={warehouseId}
          onChange={(e) => setWarehouseId(Number(e.target.value))}
          className="input input-bordered w-full"
          required
        >
          <option value={0} disabled>Selecciona un almacén</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Guardando...' : location ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  )
}

export default WarehouseLocationForm
