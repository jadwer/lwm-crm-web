// Archivo: page.tsx - Parte del módulo de Inventarios (frontend)

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useProducts } from '@/hooks/inventory/useProducts'
import { useStock } from '@/hooks/inventory/useStock'
import { Product, Stock } from '@/lib/interfaces'
import ProductTable from './ProductTable'
import Paginator from './Paginator'

const InventoryPage = () => {
  const [productos, setProductos] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paginationMeta, setPaginationMeta] = useState<any>({})

  const { stockData, getStock } = useStock()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')

  const { getPaginatedProducts } = useProducts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaginatedProducts(page)
        await getStock()

        const productosConStock = response.data.map((producto: Product) => {
          const stockItem = stockData.find((s: Stock) => s.product_id === producto.id)
          return {
            ...producto,
            stock: stockItem ? stockItem.quantity : 0
          }
        })

        setProductos(productosConStock)
        setPaginationMeta({
          current_page: response.current_page,
          links: response.links
        })
      } catch (err) {
        setError('Error al cargar productos o stock')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page])

  if (loading) return <p>Cargando inventario...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
      <ProductTable productos={productos} />
      <Paginator links={paginationMeta.links || []} currentPage={paginationMeta.current_page || 1} />
    </div>
  )
}

export default InventoryPage
