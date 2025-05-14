// Archivo: src/app/(crm)/dashboard/customers/page.tsx

'use client';

import { useState } from 'react';
import CustomerTable from './CustomerTable';
import CustomerForm from './CustomerForm';
import { useCustomers } from '@/hooks/customers/useCustomers';
import { Customer } from '@/lib/interfaces';

export default function CustomerPage() {
  const {
    customers,
    isLoading,
    isError,
    create,
    update,
    remove,
  } = useCustomers();

  const [editing, setEditing] = useState<Customer | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: Partial<Customer>) => {
    if (editing) {
      await update(editing.id, data);
    } else {
      await create(data);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditing(customer);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      await remove(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Clientes</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Cliente
        </button>
      </div>

      {showForm && (
        <CustomerForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          initialData={editing}
        />
      )}

      {isLoading && <p>Cargando clientes...</p>}
      {isError && <p className="text-red-500">Error al cargar clientes</p>}

      {!isLoading && !isError && (
        <CustomerTable customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
