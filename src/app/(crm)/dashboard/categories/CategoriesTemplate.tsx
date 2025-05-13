// Archivo: src/app/(crm)/dashboard/categories/CategoriesTemplate.tsx

'use client'

import { Category } from "@/lib/interfaces"
import { useCategories } from "@/hooks/erp/useCategories"
import AddUpdateCategories from "./AddUpdateCategories"
import { useState } from "react"

interface CategoriesTemplateProps {
  data: {
    categorias: Category[]
    status: string
    setStatus: (status: string) => void
  }
}

const CategoriesTemplate = ({ data }: CategoriesTemplateProps) => {
  const { categorias, status, setStatus } = data
  const { remove } = useCategories()
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    if (confirm("¿Seguro que deseas eliminar esta categoría?")) {
      try {
        await remove(id)
        setStatus("success")
      } catch (err) {
        console.error(err)
        setErrors({ general: ["Error al eliminar la categoría."] })
      }
    }
  }

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Categorías</h2>
            <h4>Agregar Categoría</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newCategory"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid container-product">
        <div className="row">
          <div className="col-12 mt-2 table-product">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Slug</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                    <td>{cat.slug}</td>
                    <td>
                      <button
                        className="btn-action"
                        data-bs-toggle="modal"
                        data-bs-target={`#cat-${cat.id}`}
                      >
                        Editar
                      </button>{" "}
                      |{" "}
                      <button
                        className="btn-action"
                        onClick={(e) => handleDelete(e, cat.id)}
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
      </div>

      {categorias.map((cat) => (
        <AddUpdateCategories
          key={cat.id}
          data={cat}
          category_id={`cat-${cat.id}`}
          setStatus={setStatus}
          status={status}
        />
      ))}

      <AddUpdateCategories
        data={null}
        category_id="newCategory"
        setStatus={setStatus}
        status={status}
      />
    </main>
  )
}

export default CategoriesTemplate
