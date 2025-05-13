// Archivo: page.tsx - Vista principal del módulo de Almacenes

"use client";

import { useState } from "react";
import { useWarehouses } from "@/hooks/inventory/useWarehouses";
import WarehouseTable from "./WarehouseTable";
import WarehouseForm from "./WarehouseForm";
import { Warehouse } from "@/lib/interfaces";

const WarehousePage = () => {
  const { warehouses, loading, error } = useWarehouses();
  const [submitting, setSubmitting] = useState(false);
  const { createWarehouse } = useWarehouses();

  const handleCreate = async (data: Partial<Warehouse>) => {
    setSubmitting(true);
    try {
      await createWarehouse(data);
      window.location.reload();
    } catch (e) {
      alert("Error al guardar el almacén.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Almacenes</h1>

      {loading && <p>Cargando almacenes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        <WarehouseForm onSubmit={handleCreate} loading={submitting} />
      <WarehouseTable />
      </div>

    </div>
  );
};

export default WarehousePage;

