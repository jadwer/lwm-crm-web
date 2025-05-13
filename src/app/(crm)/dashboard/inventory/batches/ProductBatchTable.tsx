// Archivo: ProductBatchTable.tsx - Tabla de lotes por producto

'use client'

import { useState } from 'react'
import { ProductBatch } from '@/lib/interfaces'
import ProductBatchForm from './ProductBatchForm'
import { useProductBatches } from '@/hooks/inventory/useProductBatches'

const ProductBatchTable = ({
  batches,
  onSuccess,
}: {
  batches: ProductBatch[]
  onSuccess: () => void
}) => {
  const [editingBatch, setEditingBatch] = useState<ProductBatch | null>(null)
  const { deleteProductBatch } = useProductBatches()

  const closeEditor = () => setEditingBatch(null)

  const handleDelete = async (batchId: number) => {
    const confirm = window.confirm("¿Estás seguro de que quieres eliminar este lote?")
    if (!confirm) return

    try {
      await deleteProductBatch(batchId)
      onSuccess() // ✅ recarga centralizada desde page.tsx
    } catch (error) {
      alert("No se pudo eliminar el lote.")
    }
  }

  return (
    <div>
      {editingBatch && (
        <div className="mb-6 border p-4 rounded-xl bg-gray-50">
          <ProductBatchForm
            productId={
              typeof editingBatch.product_id === 'object'
                ? editingBatch.product_id.id
                : editingBatch.product_id
            }
            batch={editingBatch}
            onSuccess={() => {
              closeEditor()
              onSuccess() // ✅ usar onSuccess en lugar de hook local
            }}
          />
        </div>
      )}

      <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Cantidad</th>
              <th className="px-6 py-3">Fecha de entrada</th>
              <th className="px-6 py-3">Fecha de caducidad</th>
              <th className="px-6 py-3">Almacén</th>
              <th className="px-6 py-3">Ubicación</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{batch.id}</td>
                <td className="px-6 py-3">{batch.quantity}</td>
                <td className="px-6 py-3">{batch.entry_date ?? '—'}</td>
                <td className="px-6 py-3">{batch.expiration_date ?? '—'}</td>
                <td className="px-6 py-3">
                  {batch.warehouse
                    ? `${batch.warehouse.name} (${batch.warehouse.location ?? 'sin ubicación'})`
                    : '—'}
                </td>
                <td className="px-6 py-3">
                  {batch.warehouse_location
                    ? `${batch.warehouse_location.name} [${batch.warehouse_location.type}]`
                    : '—'}
                </td>
                <td className="px-6 py-3 text-center space-x-4">
                  <button
                    onClick={() => setEditingBatch(batch)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(
                        typeof batch.product_id === 'object'
                          ? batch.product_id.id
                          : batch.product_id
                      )
                    }
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

export default ProductBatchTable
