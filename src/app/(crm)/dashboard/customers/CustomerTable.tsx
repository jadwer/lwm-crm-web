// Archivo: src/app/(crm)/dashboard/customers/CustomerTable.tsx

import { Customer } from '@/lib/interfaces';

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

export default function CustomerTable({ customers, onEdit, onDelete }: Props) {
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
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td className="border px-4 py-2">{customer.name}</td>
            <td className="border px-4 py-2">{customer.email}</td>
            <td className="border px-4 py-2">{customer.phone}</td>
            <td className="border px-4 py-2">{customer.rfc}</td>
            <td className="border px-4 py-2">
              <button
                className="mr-2 text-blue-500 hover:underline"
                onClick={() => onEdit(customer)}
              >
                Editar
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => onDelete(customer.id)}
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
