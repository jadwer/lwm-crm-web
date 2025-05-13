// Archivo: src/app/(crm)/dashboard/products/components/AddProductTemplate.tsx

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'

import SelectCategories from '@/app/(crm)/ui/dropdownItems/selectCategories'
import SelectBrands from '@/app/(crm)/ui/dropdownItems/selectBrands'
import SelectUnits from '@/app/(crm)/ui/dropdownItems/selectUnits'
import { useProducts } from '@/hooks/inventory/useProducts'
import { Product } from '@/lib/interfaces'
import {handleApiErrors} from '@/hooks/utils/handleApiErrors'

const AddProductTemplate = ({ producto }: { producto?: Product }) => {
  const { createProduct } = useProducts()
  const router = useRouter()

  const [selectedImage, setSelectedImage] = useState<string>()
  const [nombre, setNombre] = useState('')
  const [sku, setSku] = useState('')
  const [cost, setCost] = useState('')
  const [price, setPrice] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [descripcionTecnica, setDescripcionTecnica] = useState('')
  const [categoria, setCategoria] = useState<number>()
  const [marca, setMarca] = useState<number>()
  const [unidad, setUnidad] = useState<number>()
  const [image_path, setImage_path] = useState<File>()
  const [datasheet, setDatasheet] = useState<File>()
  const [iva, setIva] = useState('0')

  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [status, setStatus] = useState<string>()
  const [isFocused, setIsFocused] = useState(false)

  const handleDecimalValidation = (
    _: boolean,
    number: string,
    stateSetter: Dispatch<SetStateAction<string>>
  ) => {
    const [int, dec = ''] = number.split('.')
    let newDec = dec.padEnd(2, '0').substring(0, 2)
    const fixed = int + '.' + newDec
    stateSetter(fixed)
    setIsFocused(false)
  }

  const handleSkuValidation = (value: string) => {
    setSku(value.replace(/\s+/g, '-'))
  }

  const submitNewProduct = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
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

if (image_path) {
  formData.append('img_path', image_path.name)
  formData.append('selectedImage', image_path)
}
if (datasheet) {
  formData.append('datasheet_path', datasheet.name)
}
    try {
      await createProduct(formData)
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
            <h4>Agregar nuevo producto</h4>
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
                  onChange={(e) => handleSkuValidation(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <SelectBrands stateData={{ marca, setMarca }} label="Marca" />
              </div>
              <div className="col-md-6">
                <SelectUnits stateData={{ unidad, setUnidad }} label="Unidad" />
              </div>
              <div className="col-md-6">
                <SelectCategories
                  stateData={{ categoria, setCategoria }}
                  label="Categoría"
                />
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
                  onBlur={() =>
                    handleDecimalValidation(true, cost, setCost)
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Precio</label>
                <input
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onBlur={() =>
                    handleDecimalValidation(true, price, setPrice)
                  }
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitNewProduct}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AddProductTemplate