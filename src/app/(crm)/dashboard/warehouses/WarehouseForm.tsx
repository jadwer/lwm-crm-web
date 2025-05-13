// Archivo: WarehouseForm.tsx - Formulario para crear o editar almacenes

'use client'

import { useState, useEffect } from 'react'
import { Warehouse } from '@/lib/interfaces'

interface Props {
  warehouse?: Warehouse
  onSubmit: (data: Partial<Warehouse>) => void
  loading?: boolean
}

const WarehouseForm = ({ warehouse, onSubmit, loading }: Props) => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (warehouse) {
      setName(warehouse.name || '')
      setLocation(warehouse.location || '')
      setNotes(warehouse.notes || '')
    }
  }, [warehouse])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, location, notes })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">{warehouse ? 'Editar almacén' : 'Nuevo almacén'}</h2>

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
        <label className="block text-sm font-medium">Ubicación</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Notas</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="textarea textarea-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Guardando...' : warehouse ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  )
}

export default WarehouseForm
