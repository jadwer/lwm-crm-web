// Archivo: src/app/(crm)/dashboard/units/AddUpdateUnits.tsx

'use client'

import { useUnits } from "@/hooks/inventory/useUnits"
import { Unit } from "@/lib/interfaces"
import { handleApiErrors } from "@/hooks/utils/handleApiErrors"
import { useState, MouseEvent } from "react"

const AddUpdateUnits = ({
  data,
  unit_id,
  status,
  setStatus,
}: {
  data: Unit | null
  unit_id: string
  status: string
  setStatus: (status: string) => void
}) => {
  const unit = data ?? ({} as Unit)

  const [name, setName] = useState(unit.name ?? "")
  const [code, setCode] = useState(unit.code ?? "")
  const [type, setType] = useState(unit.type ?? "")
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const { create, update } = useUnits()

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    const payload = {
      id: unit.id,
      name,
      code,
      type,
    }

    try {
      if (unit.id) {
        await update(unit.id, payload)
      } else {
        await create(payload)
      }
      setStatus("success")
    } catch (error: any) {
      handleApiErrors(error, setErrors, (s) => setStatus(s ?? ""))
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
                Agregar / Editar Unidad
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <small className="text-danger">{errors.name[0]}</small>}

              <label className="form-label mt-3">Código</label>
              <input
                className="form-control"
                placeholder="Código"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {errors.code && <small className="text-danger">{errors.code[0]}</small>}

              <label className="form-label mt-3">Tipo</label>
              <input
                className="form-control"
                placeholder="Tipo"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              {errors.type && <small className="text-danger">{errors.type[0]}</small>}
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

export default AddUpdateUnits
