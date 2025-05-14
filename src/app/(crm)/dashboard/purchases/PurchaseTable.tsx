// Archivo: src/app/(crm)/dashboard/purchases/PurchaseTable.tsx

'use client';

import { useRouter } from 'next/navigation';
import { PurchaseOrder, Supplier } from '@/lib/interfaces';

interface Props {
  purchases: PurchaseOrder[];
  suppliers: Supplier[];
  onEdit: (purchase: PurchaseOrder) => void;
  onDelete: (id: number) => void;
}

export default function PurchaseTable({ purchases, suppliers, onEdit, onDelete }: Props) {
  const router = useRouter();

  const getSupplierName = (id: number) => suppliers.find(s => s.id === id)?.name || 'Desconocido';

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Proveedor</th>
          <th className="border px-4 py-2">Fecha</th>
          <th className="border px-4 py-2">Estado</th>
          <th className="border px-4 py-2">Total</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((po) => (
          <tr key={po.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{getSupplierName(po.supplier_id)}</td>
            <td className="border px-4 py-2">{new Date(po.order_date).toLocaleDateString()}</td>
            <td className="border px-4 py-2 capitalize">{po.status}</td>
            <td className="border px-4 py-2">${po.total_amount}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => router.push(`/dashboard/purchases/${po.id}`)}
                className="text-blue-600 hover:underline"
              >
                Ver
              </button>
              <button
                onClick={() => onEdit(po)}
                className="text-yellow-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(po.id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
