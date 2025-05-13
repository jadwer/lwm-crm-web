// Archivo: src/app/(crm)/dashboard/units/UnitsClient.tsx

'use client'

import { Suspense, useEffect, useState } from "react"
import { useUnits } from "@/hooks/inventory/useUnits"
import { Unit } from "@/lib/interfaces"
import UnitsTemplate from "./UnitsTemplate"

const UnitsClient = () => {
  const [unidades, setUnidades] = useState<Unit[]>([])
  const [status, setStatus] = useState("")
  const { getUnits } = useUnits()

  useEffect(() => {
    getUnits().then(data => {
      if (Array.isArray(data)) {
        setUnidades(data)
      }
    })
    const timeout = setTimeout(() => setStatus(""), 5000)
    return () => clearTimeout(timeout)
  }, [getUnits])

  return (
    <Suspense fallback={<p>Cargando unidades...</p>}>
      <UnitsTemplate data={{ unidades, status, setStatus }} />
    </Suspense>
  )
}

export default UnitsClient
