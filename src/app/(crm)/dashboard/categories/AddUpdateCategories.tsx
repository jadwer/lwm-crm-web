// Archivo: src/app/(crm)/dashboard/categories/AddUpdateCategories.tsx

'use client'

import { useCategories } from "@/hooks/erp/useCategories"
import { Category } from "@/lib/interfaces"
import { handleApiErrors } from '@/hooks/utils/handleApiErrors'
import { useState, MouseEvent } from "react"

const AddUpdateCategories = ({
  data,
  category_id,
  status,
  setStatus,
}: {
  data: Category | null
  category_id: string
  status: string
  setStatus: (status: string) => void
}) => {
  const category = data ?? ({} as Category)

  const [nombre, setNombre] = useState(category.name ?? "")
  const [descripcion, setDescripcion] = useState(category.description ?? "")
  const [slug, setSlug] = useState(category.slug ?? "")
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const { create, update } = useCategories()

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    const payload = {
      id: category.id,
      name: nombre,
      description: descripcion,
      slug: slug,
    }

    try {
      if (category.id) {
        await update(category.id, payload)
      } else {
        await create(payload)
      }
      setStatus("success")
    } catch (error: any) {
      handleApiErrors(error, setErrors, (status) => setStatus(status ?? ''))
    }
  }

  return (
    <div
      className="modal fade"
      id={category_id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby={`Label-${category_id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`Label-${category_id}`}>
                Agregar / Editar Categoría
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errors.name && <small className="text-danger">{errors.name[0]}</small>}

              <label className="form-label mt-3">Descripción</label>
              <input
                className="form-control"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              {errors.description && (
                <small className="text-danger">{errors.description[0]}</small>
              )}

              <label className="form-label mt-3">Slug</label>
              <input
                className="form-control"
                placeholder="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              {errors.slug && (
                <small className="text-danger">{errors.slug[0]}</small>
              )}
            </div>

            <div className="modal-footer">
              {status === "success" && (
                <div className="alert alert-success w-100 text-center mb-2 p-2">
                  ¡Cambios guardados exitosamente!
                </div>
              )}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUpdateCategories
