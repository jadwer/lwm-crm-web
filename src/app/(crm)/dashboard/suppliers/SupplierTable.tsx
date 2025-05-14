// Archivo: src/app/(crm)/dashboard/suppliers/SupplierTable.tsx

import { Supplier } from '@/lib/interfaces';

interface Props {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

export default function SupplierTable({ suppliers, onEdit, onDelete }: Props) {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Correo</th>
          <th className="border px-4 py-2">Teléfono</th>
          <th className="border px-4 py-2">RFC</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier.id}>
            <td className="border px-4 py-2">{supplier.name}</td>
            <td className="border px-4 py-2">{supplier.email}</td>
            <td className="border px-4 py-2">{supplier.phone}</td>
            <td className="border px-4 py-2">{supplier.rfc}</td>
            <td className="border px-4 py-2">
              <button
                className="mr-2 text-blue-500 hover:underline"
                onClick={() => onEdit(supplier)}
              >
                Editar
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => onDelete(supplier.id)}
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
