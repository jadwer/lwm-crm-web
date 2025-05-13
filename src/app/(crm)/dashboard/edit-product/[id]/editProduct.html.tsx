'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'

import SelectCategories from '@/app/(crm)/ui/dropdownItems/selectCategories'
import SelectBrands from '@/app/(crm)/ui/dropdownItems/selectBrands'
import SelectUnits from '@/app/(crm)/ui/dropdownItems/selectUnits'
import { useProducts } from '@/hooks/inventory/useProducts'
import { handleApiErrors } from '@/hooks/utils/handleApiErrors'
import { Product } from '@/lib/interfaces'

const EditProductTemplate = ({ producto }: { producto: Product }) => {
  const router = useRouter()
  const { updateProduct } = useProducts()

  const [selectedImage, setSelectedImage] = useState<string>()
  const [nombre, setNombre] = useState(producto.name)
  const [sku, setSku] = useState(producto.sku)
  const [cost, setCost] = useState(producto.cost?.toString() ?? '')
  const [price, setPrice] = useState(producto.price?.toString() ?? '')
  const [descripcion, setDescripcion] = useState(producto.description ?? '')
  const [descripcionTecnica, setDescripcionTecnica] = useState(producto.full_description ?? '')
  const [categoria, setCategoria] = useState<number>(producto.category_id?.id ?? producto.category_id)
  const [marca, setMarca] = useState<number>(producto.brand_id?.id ?? producto.brand_id)
  const [unidad, setUnidad] = useState<number>(producto.unit_id?.id ?? producto.unit_id)
  const [iva, setIva] = useState<string>(producto.iva)
  const [image_path, setImage_path] = useState<File>()
  const [datasheet, setDatasheet] = useState<File>()

  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [status, setStatus] = useState<string>()

  const handleDecimalValidation = (
    _: boolean,
    number: string,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    const [int, dec = ''] = number.split('.')
    let fixed = int + '.' + dec.padEnd(2, '0').substring(0, 2)
    setter(fixed)
  }

  const submitProductUpdate = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    const dataForm = {
      name: nombre,
      sku,
      description: descripcion || nombre,
      full_description: descripcionTecnica || nombre,
      cost,
      price,
      iva,
      unit_id: unidad?.toString(),
      category_id: categoria?.toString(),
      brand_id: marca?.toString(),
    }

    const formData = new FormData()
    Object.entries(dataForm).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value)
    })

    if (image_path) formData.append('selectedImage', image_path)
    if (datasheet) formData.append('datasheet', datasheet)

    try {
      await updateProduct(producto.id, formData)
      router.push('/dashboard/products')
    } catch (error: any) {
      handleApiErrors(error, setErrors, (status) => setStatus(status ?? undefined))
    }
  }

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Productos</h2>
            <h4>Editar producto</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid container-product">
        <form className="row g-3">
          <div className="col-12 col-md-4">
            <label className="form-label">Imagen del producto</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                setImage_path(file)
                setSelectedImage(file ? URL.createObjectURL(file) : undefined)
              }}
            />
            {selectedImage && (
              <Image
                src={selectedImage}
                width={300}
                height={300}
                alt="Vista previa"
                className="img-fluid"
              />
            )}
            {!selectedImage && producto.img_path && (
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/products/${producto.img_path}`}
                width={300}
                height={300}
                alt="Imagen actual"
                className="img-fluid"
              />
            )}
          </div>

          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col-md-12">
                <label className="form-label">Nombre</label>
                <input
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">SKU</label>
                <input
                  className="form-control"
                  value={sku}
                  onChange={(e) => setSku(e.target.value.replace(/\s+/g, '-'))}
                />
              </div>

              <div className="col-md-6">
                <SelectBrands stateData={{ marca, setMarca }} label="Marca" />
              </div>

              <div className="col-md-6">
                <SelectUnits stateData={{ unidad, setUnidad }} label="Unidad" />
              </div>

              <div className="col-md-6">
                <SelectCategories stateData={{ categoria, setCategoria }} label="Categoría" />
              </div>

              <div className="col-md-12">
                <label className="form-label">Descripción</label>
                <input
                  className="form-control"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Costo</label>
                <input
                  className="form-control"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  onBlur={() => handleDecimalValidation(true, cost, setCost)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Precio</label>
                <input
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onBlur={() => handleDecimalValidation(true, price, setPrice)}
                />
              </div>

              <div className="col-md-6 mt-2">
                <input
                  id="iva"
                  type="checkbox"
                  className="form-check-input"
                  checked={iva === '1'}
                  onChange={(e) => setIva(e.target.checked ? '1' : '0')}
                />
                <label htmlFor="iva" className="form-check-label ms-2">
                  Incluye IVA
                </label>
              </div>

              <div className="col-md-12">
                <label className="form-label">Ficha técnica (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setDatasheet(e.target.files?.[0])}
                />
                {producto.datasheet_path && (
                  <div className="d-grid gap-2">
                    <a
                      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/datasheets/${producto.datasheet_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary mt-1"
                    >
                      Descargar ficha técnica
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Descripción técnica</label>
            <textarea
              className="form-control"
              value={descripcionTecnica}
              onChange={(e) => setDescripcionTecnica(e.target.value)}
            />
            <br />
            <Link href="/dashboard/products" className="btn btn-secondary me-4">
              Cancelar
            </Link>
            <button type="button" className="btn btn-primary" onClick={submitProductUpdate}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default EditProductTemplate
