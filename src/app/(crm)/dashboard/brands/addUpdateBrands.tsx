'use client'

import { useBrands } from '@/hooks/erp/useBrands'
import { Brand } from '@/lib/interfaces'
import { handleApiErrors } from '@/hooks/utils/handleApiErrors'
import { MouseEvent, useState } from 'react'

const AddUpdateBrands = ({
  data,
  brand_id,
  status,
  setStatus,
}: {
  data: Brand | null
  brand_id: string
  status: string
  setStatus: (value: string) => void
}) => {
  const brand = data ?? ({} as Brand)

  const [nombre, setNombre] = useState(brand.name ?? '')
  const [descripcion, setDescripcion] = useState(brand.description ?? '')
  const [slug, setSlug] = useState(brand.slug ?? '')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const { create, update } = useBrands()

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()

    const payload = {
      id: brand.id,
      name: nombre,
      description: descripcion,
      slug: slug,
    }

    try {
      console.log(brand)
      if (brand.id) {
        await update(brand.id, payload)
        console.log("actualizando")
      } else {
        await create(payload)
        console.log("creando:")
        console.log(payload)
      }
      setStatus('success')
    } catch (error: any) {
      handleApiErrors(error, setErrors, (status) => setStatus(status ?? ''))
    }
  }

  return (
    <div
      className="modal fade"
      id={brand_id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby={`Label-${brand_id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`Label-${brand_id}`}>
                Agregar / Editar Marca
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <div>
                <label className="form-label">Marca</label>
                <input
                  className="form-control"
                  placeholder="Nombre de la marca"
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
                  placeholder="Slug de la marca"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                {errors.slug && <small className="text-danger">{errors.slug[0]}</small>}
              </div>
            </div>

            <div className="modal-footer">
              {status === 'success' && (
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
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUpdateBrands
