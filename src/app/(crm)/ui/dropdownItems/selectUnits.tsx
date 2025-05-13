"use client"

import { useUnits } from "@/hooks/inventory/useUnits"
import { Unit } from "@/lib/interfaces"
import { useEffect, useState } from "react"

const SelectUnits = (props: any) => {
  const label = props.label
  const { getUnits } = useUnits()
  const [units, setUnits] = useState<Unit[]>([])

  useEffect(() => {
    getUnits().then((data) => {
      if (Array.isArray(data)) setUnits(data)
    })
  }, [])

  if (units.length === 0) return <>Cargando...</>

  return (
    <select
      id="unidad"
      className="form-select"
      value={props.stateData.unidad}
      onChange={(e) => {
        props.stateData.setUnidad(e.target.value)
      }}
    >
      <option value="">{label}</option>
      {units.map((unidad: Unit) => (
        <option value={unidad.id} key={unidad.id}>
          {unidad.name}
        </option>
      ))}
    </select>
  )
}

export default SelectUnits