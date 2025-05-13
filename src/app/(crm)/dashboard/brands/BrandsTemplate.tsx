// Archivo: src/app/(crm)/dashboard/brands/BrandsTemplate.tsx

'use client'

import { Brand } from "@/lib/interfaces"
import { useBrands } from "@/hooks/erp/useBrands"
import AddUpdateBrands from "./AddUpdateBrands"
import { useState } from "react"

interface BrandsTemplateProps {
  data: {
    marcas: Brand[]
    status: string
    setStatus: (status: string) => void
  }
}

const BrandsTemplate = ({ data }: BrandsTemplateProps) => {
  const { marcas, setStatus, status } = data
  const { remove } = useBrands()
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    if (confirm("¿Seguro que deseas eliminar esta marca?")) {
      try {
        await remove(id)
        setStatus("success")
      } catch (err) {
        console.error(err)
        setErrors({ general: ["Error al eliminar la marca."] })
      }
    }
  }

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Marcas</h2>
            <h4>Agregar Marca</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newBrand"
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
                {marcas.map((marca) => (
                  <tr key={marca.id}>
                    <td>{marca.name}</td>
                    <td>{marca.description}</td>
                    <td>{marca.slug}</td>
                    <td>
                      <button
                        className="btn-action"
                        data-bs-toggle="modal"
                        data-bs-target={`#brand-${marca.id}`}
                      >
                        Editar
                      </button>{" "}
                      |{" "}
                      <button
                        className="btn-action"
                        onClick={(e) => handleDelete(e, marca.id)}
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

      {marcas.map((marca) => (
        <AddUpdateBrands
          key={marca.id}
          data={marca}
          brand_id={`brand-${marca.id}`}
          setStatus={setStatus}
          status={status}
        />
      ))}

      <AddUpdateBrands
        data={null}
        brand_id="newBrand"
        setStatus={setStatus}
        status={status}
      />
    </main>
  )
}

export default BrandsTemplate
