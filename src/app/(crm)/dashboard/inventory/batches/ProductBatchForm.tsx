// Archivo: ProductBatchForm.tsx - Formulario para registrar o editar un lote

"use client";

import { useEffect, useState } from "react";
import { useWarehouses } from "@/hooks/inventory/useWarehouses";
import { useWarehouseLocations } from "@/hooks/inventory/useWarehouseLocations";
import { useProductBatches } from "@/hooks/inventory/useProductBatches";
import { ProductBatch } from "@/lib/interfaces";

interface FormProps {
  productId: number;
  batch?: ProductBatch;
  onSuccess?: () => void;
}

const ProductBatchForm = ({ productId, batch, onSuccess }: FormProps) => {
  const [quantity, setQuantity] = useState<number>(batch?.quantity || 0);
  const [batchNumber, setBatchNumber] = useState<string>(
    batch?.batch_number || ""
  );
  const [entryDate, setEntryDate] = useState<string>(batch?.entry_date || "");
  const [expirationDate, setExpirationDate] = useState<string>(
    batch?.expiration_date || ""
  );
  const [warehouseId, setWarehouseId] = useState<number>(
    Number(batch?.warehouse_id) || 0
  );
  const [locationId, setLocationId] = useState<number>(
    Number(batch?.warehouse_location_id) || 0
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { warehouses } = useWarehouses();
  const { locations } = useWarehouseLocations();
  const { createProductBatch, updateProductBatch } = useProductBatches();

  useEffect(() => {
    if (batch) {
      setQuantity(batch.quantity);
      setBatchNumber(batch.batch_number);
      setEntryDate(batch.entry_date || "");
      setExpirationDate(batch.expiration_date || "");
      setWarehouseId(Number(batch.warehouse_id || 0));
      setLocationId(Number(batch.warehouse_location_id || 0));
    }
  }, [batch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      product_id: typeof productId === "object" ? productId.id : productId,
      quantity,
      batch_number: batchNumber,
      entry_date: entryDate || null,
      expiration_date: expirationDate || null,
      warehouse_id: warehouseId,
      warehouse_location_id: locationId,
    };

    try {
      if (batch) {
        await updateProductBatch(batch.id, payload);
      } else {
        await createProductBatch(payload);
      }

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError("Error al guardar el lote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-xl border shadow-sm">
      <h2 className="text-lg font-semibold">
        {batch ? "Editar lote" : "Registrar nuevo lote"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Cantidad</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Número de lote</label>
        <input
          type="text"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de entrada</label>
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de caducidad</label>
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Almacén</label>
        <select
          value={warehouseId}
          onChange={(e) => setWarehouseId(Number(e.target.value))}
          className="input input-bordered w-full"
          required>
          <option value={0} disabled>
            Selecciona un almacén
          </option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Ubicación</label>
        <select
          value={locationId}
          onChange={(e) => setLocationId(Number(e.target.value))}
          className="input input-bordered w-full"
          required>
          <option value={0} disabled>
            Selecciona una ubicación
          </option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}>
        {loading
          ? batch
            ? "Actualizando..."
            : "Registrando..."
          : batch
          ? "Actualizar Lote"
          : "Registrar Lote"}
      </button>
    </form>
  );
};

export default ProductBatchForm;

