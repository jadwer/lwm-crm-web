// Archivo: src/app/(crm)/dashboard/suppliers/page.tsx

'use client';

import { useState } from 'react';
import SupplierTable from './SupplierTable';
import SupplierForm from './SupplierForm';
import { useSuppliers } from '@/hooks/suppliers/useSuppliers';
import { Supplier } from '@/lib/interfaces';

export default function SupplierPage() {
  const {
    suppliers,
    isLoading,
    isError,
    create,
    update,
    remove,
  } = useSuppliers();

  const [editing, setEditing] = useState<Supplier | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: Partial<Supplier>) => {
    if (editing) {
      await update(editing.id, data);
    } else {
      await create(data);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditing(supplier);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      await remove(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Proveedores</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Proveedor
        </button>
      </div>

      {showForm && (
        <SupplierForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          initialData={editing}
        />
      )}

      {isLoading && <p>Cargando proveedores...</p>}
      {isError && <p className="text-red-500">Error al cargar proveedores</p>}

      {!isLoading && !isError && (
        <SupplierTable suppliers={suppliers} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
