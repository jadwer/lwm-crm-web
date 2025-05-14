// Archivo: SalesPage.tsx

'use client';

import { useState } from 'react';
import SalesForm from './SalesForm';
import SalesTable from './SalesTable';
import { useSales } from '@/hooks/sales/useSales';
import { useCustomers } from '@/hooks/customers/useCustomers';
import { SalesOrder, ProductMini } from '@/lib/interfaces';

export default function SalesPage() {
  const { sales, isLoading, isError, create, update, remove } = useSales();
  const { customers, isLoading: loadingCustomers } = useCustomers();

  const [editing, setEditing] = useState<SalesOrder | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: Partial<SalesOrder>, items: ProductMini[]) => {
    if (editing) {
      await update(editing.id, data);
    } else {
      const payload = {
        ...data,
        items: items.map(item => ({
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

  const handleEdit = (order: SalesOrder) => {
    setEditing(order);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar esta orden de venta?')) {
      await remove(id);
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Órdenes de Venta</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Nueva Venta</button>
      </div>

      {showForm && (
        <SalesForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          customers={customers}
          initialData={editing}
        />
      )}

      {!showForm && isLoading && <p>Cargando órdenes...</p>}
      {!showForm && isError && <p>Error al cargar ventas</p>}

      {!showForm && sales.length > 0 && (
        <SalesTable
          orders={sales}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={() => {}}
        />
      )}

      {!showForm && sales.length === 0 && (
        <p className="text-muted">No hay órdenes registradas.</p>
      )}
    </div>
  );
}
