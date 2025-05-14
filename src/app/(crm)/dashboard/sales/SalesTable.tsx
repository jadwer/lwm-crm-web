// Archivo: SalesTable.tsx

"use client";
import { useRouter } from "next/navigation";
import { SalesOrder } from "@/lib/interfaces";

interface Props {
  orders: SalesOrder[];
  onEdit: (order: SalesOrder) => void;
  onDelete: (id: number) => void;
  onView: (order: SalesOrder) => void;
}

export default function SalesTable({
  orders,
  onEdit,
  onDelete,
  onView,
}: Props) {
  const router = useRouter();

  return (
    <table className="table table-bordered mt-4">
      <thead className="table-light">
        <tr>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.customer?.name ?? `ID: ${order.customer_id}`}</td>
            <td>{order.order_date}</td>
            <td>{order.status}</td>
            <td>${parseFloat(order.total_amount).toFixed(2)}</td>
            <td>
              <button
                onClick={() => router.push(`/dashboard/sales/${order.id}`)}
                className="btn btn-sm btn-info me-2">
                Ver
              </button>
              <button
                onClick={() => onEdit(order)}
                className="btn btn-sm btn-warning me-2">
                Editar
              </button>
              <button
                onClick={() => onDelete(order.id)}
                className="btn btn-sm btn-danger">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

