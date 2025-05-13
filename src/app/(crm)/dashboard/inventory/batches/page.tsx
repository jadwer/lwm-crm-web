// Archivo: index.tsx - Vista principal para ver los lotes de un producto

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useProductBatches } from '@/hooks/inventory/useProductBatches'
import ProductBatchTable from './ProductBatchTable'
import ProductBatchForm from './ProductBatchForm'

const ProductBatchPage = () => {
  const searchParams = useSearchParams()
  const productId = Number(searchParams.get('product_id'))

  const { batches, loading, error, getProductBatches } = useProductBatches()

  useEffect(() => {
    if (productId) {
      getProductBatches(productId)
    }
  }, [productId])

  const handleSuccess = () => {
    getProductBatches(productId)
  }

  if (!productId) return <p className="text-red-500">Error: falta el parámetro <code>product_id</code>.</p>
  if (loading) return <p>Cargando lotes del producto...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lotes del Producto #{productId}</h1>
      <ProductBatchForm productId={productId} onSuccess={handleSuccess} />
      <div className="mt-6">
        <ProductBatchTable batches={batches} />
      </div>
    </div>
  )
}

export default ProductBatchPage
