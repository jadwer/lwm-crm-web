// Archivo: ProductTable.tsx - Parte del módulo de Inventarios (frontend)

'use client'

import Link from 'next/link'
import { Product } from '@/lib/interfaces'

const ProductTable = ({ productos }: { productos: Product[] }) => {
  console.log("📦 Productos recibidos en ProductTable:", productos[0].category_id.name);
  return (
    <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase font-medium">
          <tr>
            <th scope="col" className="px-6 py-3">Producto</th>
            <th scope="col" className="px-6 py-3">Marca</th>
            <th scope="col" className="px-6 py-3">Categoría</th>
            <th scope="col" className="px-6 py-3">Unidad</th>
            <th scope="col" className="px-6 py-3">Stock</th>
            <th scope="col" className="px-6 py-3 text-center">Lotes</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-3">{producto.name}</td>
              <td className="px-6 py-3">{producto.brand_id?.name || '-'}</td>
              <td className="px-6 py-3">{producto.category_id?.name || '-'}</td>
              <td className="px-6 py-3">{producto.unit_id?.name || '-'}</td>
              <td className="px-6 py-3 font-semibold">{producto.stock ?? '0'}</td>
              <td className="px-6 py-3 text-center">
                <Link
                  href={`/dashboard/inventory/batches?product_id=${producto.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver lotes
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
