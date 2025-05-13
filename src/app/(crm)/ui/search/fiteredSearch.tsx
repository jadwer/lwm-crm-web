"use client"

import Paginator from "@/app/(crm)/ui/paginator/paginator"
import { useProducts } from "@/hooks/erp/useProducts"
import { Product } from "@/lib/interfaces"
import Link from "next/link"
import { useEffect, useState } from "react"

const FilteredSearch = (props: any) => {
  const searchFilter = props.data.searchFilter
  const pageQuery = props.functions.pageQuery

  const [productos, setProductos] = useState<Product[]>([])
  const [meta, setMeta] = useState<any>()
  const [status, setStatus] = useState<string>()
  const [errors, setErrors] = useState<any[]>([])

  const { getFilteredProducts, deleteProduct } = useProducts()

useEffect(() => {
  if (!searchFilter) return

  getFilteredProducts(searchFilter)
    .then((res) => {
      setProductos(res.data)
      const { data, ...metaWithoutData } = res
      setMeta(metaWithoutData)
    })
    .catch((err) => console.error("Error al cargar productos:", err))
}, [searchFilter]);

  const submitDelProduct = (
    e: { preventDefault: () => void },
    prod_id: number
  ) => {
    e.preventDefault()
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      deleteProduct(prod_id)
      props.functions.setPage("")
    }
  }

  if (!Array.isArray(productos)) return <>Cargando...</>

  return (
    <>
      <div className="row">
        <div className="col-12 mt-2 table-product">
          <table className="table">
            <thead>
              <tr>
                <th className="tab-name">Nombre del producto</th>
                <th className="tab-category">Categoría</th>
                <th className="tab-brand">Marca</th>
                <th className="tab-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto: Product) => (
                <tr key={producto.id}>
                  <th scope="row">
                    <Link href={`/producto/${producto.id}`} target="_blank">
                      {producto.name}
                    </Link>
                  </th>
                  <td>{producto.category_id?.name}</td>
                  <td>{producto.brand_id?.name}</td>
                  <td>
                    <Link href={`/dashboard/edit-product/${producto.id}`}>
                      <i className="bi bi-pencil-square"></i>
                    </Link>{" "}
                    |{" "}
                    <a href="#" onClick={(e) => submitDelProduct(e, producto.id)}>
                      <i className="bi bi-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {meta && <Paginator data={{ metaData: meta }} functions={{ pageQuery }} />}
        </div>
      </div>
    </>
  )
}

export default FilteredSearch
