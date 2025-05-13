'use client'

import { useUnits } from '@/hooks/inventory/useUnits'
import { Unit } from '@/lib/interfaces'
import { handleApiErrors } from '@/hooks/utils/handleApiErrors'
import { MouseEvent, useState } from 'react'

const AddUpdateUnits = ({
  data,
  unit_id,
  status,
  setStatus,
}: {
  data: Unit | null
  unit_id: string
  status: string
  setStatus: (value: string) => void
}) => {
  const unit = data ?? ({} as Unit)

  const [nombre, setNombre] = useState(unit.name ?? '')
  const [tipo, setTipo] = useState(unit.type ?? '')
  const [code, setCode] = useState(unit.code ?? '')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const { create, update } = useUnits()

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()

    const payload = {
      id: unit.id,
      name: nombre,
      type: tipo,
      code: code,
    }

    try {
      if (unit.id) {
        await update(unit.id, payload)
      } else {
        await create(payload)
      }
      setStatus('success')
    } catch (error: any) {
      handleApiErrors(error, setErrors, (status) => setStatus(status ?? ''))
    }
  }

  return (
    <div
      className="modal fade"
      id={unit_id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby={`Label-${unit_id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`Label-${unit_id}`}>
                Agregar / Editar Unidad de Medida
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
                <label className="form-label">Nombre</label>
                <input
                  className="form-control"
                  placeholder="Nombre de la unidad"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errors.name && <small className="text-danger">{errors.name[0]}</small>}

                <label className="form-label mt-3">Descripción</label>
                <input
                  className="form-control"
                  placeholder="Descripción"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
                {errors.type && <small className="text-danger">{errors.type[0]}</small>}

                <label className="form-label mt-3">Código</label>
                <input
                  className="form-control"
                  placeholder="Código de unidad"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {errors.code && <small className="text-danger">{errors.code[0]}</small>}
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

export default AddUpdateUnits
