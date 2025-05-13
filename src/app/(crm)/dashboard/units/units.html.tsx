'use client'

import AddUpdateUnits from './addUpdateUnits'
import { useUnits } from '@/hooks/inventory/useUnits'
import { useState } from 'react'
import { Unit } from '@/lib/interfaces'
import { handleApiErrors } from '@/hooks/utils/handleApiErrors'

const UnitsTemplate = (props: any) => {
const { unidades = [], status, setStatus } = props.data ?? {};
const [errors, setErrors] = useState<Record<string, string[]>>({})

  const { remove } = useUnits()

  const submitDelUnit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    unit_id: number
  ) => {
    e.preventDefault()
    if (
      confirm(
        '¿Estás seguro que quieres eliminar esta unidad de medida? Esta acción no se puede deshacer.'
      )
    ) {
      try {
        await remove(unit_id)
        setStatus('deleted')
      } catch (error: any) {
        handleApiErrors(error, setErrors, (st) => setStatus(st ?? 'error'))
      }
    }
  }

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Unidades</h2>
            <h4>Agregar unidad de medida</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <button
              type="button"
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
                  <th className="tab-category">Nombre</th>
                  <th className="tab-name">Descripción</th>
                  <th className="tab-brand">Código</th>
                  <th className="tab-actions">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(unidades) && unidades.map((unidad: Unit) => (
                  <tr key={unidad.id}>
                    <td>{unidad.name}</td>
                    <td>{unidad.type}</td>
                    <td>{unidad.code}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-action"
                        data-bs-toggle="modal"
                        data-bs-target={`#unit-${unidad.id}`}
                      >
                        Editar
                      </button>{' '}
                      |{' '}
                      <button
                        type="button"
                        className="btn-action"
                        onClick={(e) => submitDelUnit(e, unidad.id)}
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

      {Array.isArray(unidades) && unidades.map((unidad: Unit) => (
        <AddUpdateUnits
          key={unidad.id}
          data={unidad}
          unit_id={`unit-${unidad.id}`}
          status={status}
          setStatus={setStatus}
        />
      ))}

      <AddUpdateUnits
        data={null}
        unit_id="newUnit"
        status={status}
        setStatus={setStatus}
      />
    </main>
  )
}

export default UnitsTemplate
