'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import SelectCategories from '@/app/(crm)/ui/dropdownItems/selectCategories'
import SelectBrands from '@/app/(crm)/ui/dropdownItems/selectBrands'
import Paginator from '@/app/(crm)/ui/paginator/paginator'

import { Brand, Category, Product } from '@/lib/interfaces'
import { useProducts } from '@/hooks/inventory/useProducts'
import { handleApiErrors } from '@/hooks/utils/handleApiErrors'

const ProductsTemplate = ({ data, functions }: any) => {
  const productos: Product[] = data.productos.data
  const metaData = data.productos
  const searchQueryBuilder = functions.searchQueryBuilder

  const [categoria, setCategoria] = useState<Category>({} as Category)
  const [marca, setMarca] = useState<Brand>({} as Brand)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [status, setStatus] = useState<string>()

  const router = useRouter()
  const { deleteProduct } = useProducts()

  const handleDeleteProduct = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    productId: number
  ) => {
    e.preventDefault()

    const confirmDelete = confirm(
      '¿Estás seguro que quieres eliminar este producto? Esta acción no se puede deshacer.'
    )

    if (!confirmDelete) return

    try {
      await deleteProduct(productId)
      router.refresh()
    } catch (error: any) {
      handleApiErrors(error, setErrors, (status) => setStatus(status ?? undefined))
    }
  }

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Productos</h2>
            <h4>Todos los productos</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <Link href="/dashboard/import-list" className="btn btn-primary ms-2">
              Importar lista
            </Link>
            <Link href="/dashboard/add-product" className="btn btn-primary ms-2">
              Agregar producto
            </Link>
          </div>
        </div>
      </div>

      <div className="container-fluid container-product">
        <div className="row back-header-2">
          <div className="col-md-3">
            <SelectCategories
              stateData={{ categoria, setCategoria }}
              label="Filtro por categoría"
            />
          </div>
          <div className="col-md-3">
            <SelectBrands
              stateData={{ marca, setMarca }}
              label="Filtro por marca"
            />
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto"
                aria-label="Buscar"
                aria-describedby="button-addon2"
              />
              <button className="btn btn-primary" type="button" id="button-addon2">
                Buscar
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-2 table-product">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Marca</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <Link href={`/producto/${producto.id}`} target="_blank" rel="noopener noreferrer">
                        {producto.name}
                      </Link>
                    </td>
                    <td>{producto.category_id?.name}</td>
                    <td>{producto.brand_id?.name}</td>
                    <td>
                      <Link href={`/dashboard/edit-product/${producto.id}`} className="me-2">
                        <i className="bi bi-pencil-square" />
                      </Link>
                      <a href="#" onClick={(e) => handleDeleteProduct(e, producto.id)}>
                        <i className="bi bi-trash" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Paginator data={{ metaData }} functions={{ searchQueryBuilder }} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductsTemplate