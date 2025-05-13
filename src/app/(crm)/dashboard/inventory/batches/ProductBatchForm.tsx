// Archivo: ProductBatchForm.tsx - Formulario para registrar o editar un lote

'use client'

import { useEffect, useState } from 'react'
import axiosClient from '@/lib/axiosClient'
import { useWarehouses } from '@/hooks/inventory/useWarehouses'
import { useWarehouseLocations } from '@/hooks/inventory/useWarehouseLocations'
import { ProductBatch } from '@/lib/interfaces'

interface FormProps {
  productId: number
  batch?: ProductBatch
  onSuccess?: () => void
}

const ProductBatchForm = ({ productId, batch, onSuccess }: FormProps) => {
  const [quantity, setQuantity] = useState<number>(batch?.quantity || 0)
  const [entryDate, setEntryDate] = useState<string>(batch?.entry_date || '')
  const [warehouseId, setWarehouseId] = useState<number>(batch?.warehouse_id || 0)
  const [locationId, setLocationId] = useState<number>(batch?.warehouse_location_id || 0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [batchNumber, setBatchNumber] = useState<string>(batch?.batch_number || '')
  
  const { warehouses } = useWarehouses()
  const { locations } = useWarehouseLocations()

  useEffect(() => {
    if (batch) {
      setQuantity(batch.quantity)
      setEntryDate(batch.entry_date || '')
      setWarehouseId(batch.warehouse_id)
      setLocationId(batch.warehouse_location_id)
    }
  }, [batch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (batch) {
await axiosClient.put(`/api/product-batches/${batch.id}`, {
  quantity,
  batch_number: batchNumber,
  entry_date: entryDate,
  warehouse_id: warehouseId,
  warehouse_location_id: locationId,
})      } else {
        await axiosClient.post('/api/product-batches', {
product_id: productId,
  quantity,
  batch_number: batchNumber,
  entry_date: entryDate,
  warehouse_id: warehouseId,
  warehouse_location_id: locationId,        })
      }

      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError('Error al guardar el lote.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl border shadow-sm">
      <h2 className="text-lg font-semibold">{batch ? 'Editar lote' : 'Registrar nuevo lote'}</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Cantidad</label>
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="input input-bordered w-full" required />
      </div>

<div>
  <label className="block text-sm font-medium">Número de lote</label>
  <input
    type="text"
    value={batchNumber}
    onChange={(e) => setBatchNumber(e.target.value)}
    className="input input-bordered w-full"
    required
  />
</div>

      <div>
        <label className="block text-sm font-medium">Fecha de entrada</label>
        <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} className="input input-bordered w-full" required />
      </div>

      <div>
        <label className="block text-sm font-medium">Almacén</label>
        <select value={warehouseId} onChange={(e) => setWarehouseId(Number(e.target.value))} className="input input-bordered w-full" required>
          <option value={0} disabled>Selecciona un almacén</option>
          {warehouses.map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Ubicación</label>
        <select value={locationId} onChange={(e) => setLocationId(Number(e.target.value))} className="input input-bordered w-full" required>
          <option value={0} disabled>Selecciona una ubicación</option>
          {locations.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? (batch ? 'Actualizando...' : 'Registrando...') : (batch ? 'Actualizar Lote' : 'Registrar Lote')}
      </button>
    </form>
  )
}

export default ProductBatchForm
