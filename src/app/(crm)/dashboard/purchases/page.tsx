// Temporal placeholder
// Archivo: src/app/(crm)/dashboard/purchases/page.tsx

'use client';

import { useState } from 'react';
import PurchaseTable from './PurchaseTable';
import PurchaseForm from './PurchaseForm';
import { usePurchases } from '@/hooks/purchases/usePurchases';
import { useSuppliers } from '@/hooks/suppliers/useSuppliers';
import { PurchaseOrder, ProductMini } from '@/lib/interfaces';

export default function PurchasePage() {
  const {
    purchases,
    isLoading,
    isError,
    create,
    update,
    remove,
  } = usePurchases();

  const { suppliers, isLoading: loadingSuppliers } = useSuppliers();

  const [editing, setEditing] = useState<PurchaseOrder | null>(null);
  const [showForm, setShowForm] = useState(false);

const handleSubmit = async (data: Partial<PurchaseOrder>, items: ProductMini[]) => {
  if (editing) {
    await update(editing.id, data); // futuro: actualizar ítems también
  } else {
    const payload = {
      ...data,
      items: items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity ?? 0,
        unit_price: item.unit_price ?? 0,
        subtotal: (item.unit_price ?? 0) * (item.quantity ?? 0),
      })),
    };

    await create(payload);
  }

  setShowForm(false);
  setEditing(null);
};
const handleEdit = (po: PurchaseOrder) => {
    setEditing(po);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar esta orden de compra?')) {
      await remove(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Órdenes de Compra</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nueva Orden
        </button>
      </div>

      {showForm && !loadingSuppliers && (
        <PurchaseForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          suppliers={suppliers}
          initialData={editing}
        />
      )}

      {isLoading && <p>Cargando órdenes de compra...</p>}
      {isError && <p className="text-red-500">Error al cargar órdenes.</p>}

      {!isLoading && !isError && (
        <PurchaseTable
          purchases={purchases}
          suppliers={suppliers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
