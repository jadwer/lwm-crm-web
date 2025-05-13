// Archivo: src/app/(crm)/dashboard/units/UnitsTemplate.tsx

'use client'

import { Unit } from "@/lib/interfaces"
import { useUnits } from "@/hooks/inventory/useUnits"
import AddUpdateUnits from "./AddUpdateUnits"
import { useState } from "react"

interface UnitsTemplateProps {
  data: {
    unidades: Unit[]
    status: string
    setStatus: (status: string) => void
  }
}

const UnitsTemplate = ({ data }: UnitsTemplateProps) => {
  const { unidades, status, setStatus } = data
  const { remove } = useUnits()
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    if (confirm("¿Seguro que deseas eliminar esta unidad?")) {
      try {
        await remove(id)
        setStatus("success")
      } catch (err) {
        console.error(err)
        setErrors({ general: ["Error al eliminar la unidad."] })
      }
    }
  }

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Unidades</h2>
            <h4>Agregar Unidad</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newUnit"
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
                  <th>Código</th>
                  <th>Tipo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {unidades.map((unit) => (
                  <tr key={unit.id}>
                    <td>{unit.name}</td>
                    <td>{unit.code}</td>
                    <td>{unit.type}</td>
                    <td>
                      <button
                        className="btn-action"
                        data-bs-toggle="modal"
                        data-bs-target={`#unit-${unit.id}`}
                      >
                        Editar
                      </button>{" "}
                      |{" "}
                      <button
                        className="btn-action"
                        onClick={(e) => handleDelete(e, unit.id)}
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

      {unidades.map((unit) => (
        <AddUpdateUnits
          key={unit.id}
          data={unit}
          unit_id={`unit-${unit.id}`}
          setStatus={setStatus}
          status={status}
        />
      ))}

      <AddUpdateUnits
        data={null}
        unit_id="newUnit"
        setStatus={setStatus}
        status={status}
      />
    </main>
  )
}

export default UnitsTemplate
