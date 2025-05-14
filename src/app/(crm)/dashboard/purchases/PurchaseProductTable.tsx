// Archivo: src/app/(crm)/dashboard/purchases/PurchaseProductTable.tsx

import { ProductMini } from '@/lib/interfaces';

interface Props {
  items: ProductMini[];
  onDelete: (id: number) => void;
}

export default function PurchaseProductTable({ items, onDelete }: Props) {
  if (items.length === 0) {
    return <p className="text-gray-600 italic">No hay productos en esta orden.</p>;
  }

  return (
    <table className="min-w-full border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-3 py-2">SKU</th>
          <th className="border px-3 py-2">Nombre</th>
          <th className="border px-3 py-2 text-center">Cantidad</th>
          <th className="border px-3 py-2 text-right">Precio Unitario</th>
          <th className="border px-3 py-2 text-right">Subtotal</th>
          <th className="border px-3 py-2 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td className="border px-3 py-1">{item.sku}</td>
            <td className="border px-3 py-1">{item.name}</td>
            <td className="border px-3 py-1 text-center">{item.quantity}</td>
            <td className="border px-3 py-1 text-right">${item.unit_price?.toFixed(2)}</td>
            <td className="border px-3 py-1 text-right">${item.subtotal?.toFixed(2)}</td>
            <td className="border px-3 py-1 text-center">
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Quitar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
