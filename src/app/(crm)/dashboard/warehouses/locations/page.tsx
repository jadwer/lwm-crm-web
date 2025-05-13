// Archivo: page.tsx - Vista principal del módulo de Ubicaciones de Almacén

'use client'

import WarehouseLocationTable from './WarehouseLocationTable'

const WarehouseLocationPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ubicaciones de Almacén</h1>
      <WarehouseLocationTable />
    </div>
  )
}

export default WarehouseLocationPage
