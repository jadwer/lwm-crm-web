"use client"

import { useBrands } from "@/hooks/erp/useBrands"
import { Brand } from "@/lib/interfaces"
import { useEffect, useState } from "react"

const SelectBrands = (props: any) => {
  const label = props.label
  const { getBrands } = useBrands()
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    getBrands().then((data) => {
      if (Array.isArray(data)) setBrands(data)
    })
  }, [])

  if (!Array.isArray(brands)) return <>Cargando...</>

  return (
    <select
      id="marca"
      className="form-select"
      value={props.stateData.marca}
      onChange={(e) => {
        const selected = e.target.value
        props.stateData.setMarca(selected)
        if (props.stateData.setQueryBrandsId) {
          props.stateData.setQueryBrandsId(selected ? [selected] : [])
        }
      }}
    >
      <option value={""} defaultValue={""}>{label}</option>
      <option value="">Todas las categorías</option>
      {brands.map((marca) => (
        <option value={marca.id} key={marca.id}>
          {marca.name}
        </option>
      ))}
    </select>
  )
}

export default SelectBrands
