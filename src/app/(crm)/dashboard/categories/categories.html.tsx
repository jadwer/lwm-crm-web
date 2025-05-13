'use client'

import Link from 'next/link'
import AddUpdateCategory from './addUpdateCats'
import { useCategories } from '@/hooks/erp/useCategories'
import { useState } from 'react'
import { Category } from '@/lib/interfaces'
import { handleApiErrors } from '@/hooks/utils/handleApiErrors'

const CategoriesTemplate = (props: any) => {
  const categorias: Category[] = props.data.categorias.data
  const [status, setStatus] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const { remove } = useCategories()

  const submitDelCategory = async (
    e: React.MouseEvent<HTMLButtonElement>,
    cat_id: number
  ) => {
    e.preventDefault()
    if (
      confirm('¿Estás seguro que quieres eliminar esta categoría? Esta acción no se puede deshacer.')
    ) {
      try {
        await remove(cat_id)
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
            <h2>Categorías</h2>
            <h4>Agregar Categoría</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newCat"
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
                  <th className="tab-brand">Slug</th>
                  <th className="tab-actions">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.name}</td>
                    <td>{categoria.description}</td>
                    <td>{categoria.slug}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-action"
                        data-bs-toggle="modal"
                        data-bs-target={`#cat-${categoria.id}`}
                      >
                        Editar
                      </button>{' '}
                      |{' '}
                      <button
                        type="button"
                        className="btn-action"
                        onClick={(e) => submitDelCategory(e, categoria.id)}
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

      {categorias.map((categoria) => (
        <AddUpdateCategory
          key={categoria.id}
          data={categoria}
          cat_id={`cat-${categoria.id}`}
          status={status}
          setStatus={setStatus}
        />
      ))}

      <AddUpdateCategory
        data={null}
        cat_id="newCat"
        status={status}
        setStatus={setStatus}
      />
    </main>
  )
}

export default CategoriesTemplate
