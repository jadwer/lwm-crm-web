// Archivo: SalesProductTable.tsx

import { ProductMini } from '@/lib/interfaces';

interface Props {
  items: ProductMini[];
  onDelete: (id: number) => void;
}

export default function SalesProductTable({ items, onDelete }: Props) {
  if (items.length === 0) {
    return <p className="text-muted">No hay productos en esta orden.</p>;
  }

  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={`${item.id}-${index}`}>
            <td>{item.sku}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>${item.unit_price?.toFixed(2)}</td>
            <td>${item.subtotal?.toFixed(2)}</td>
            <td>
              <button onClick={() => onDelete(item.id)} className="btn btn-sm btn-danger">Quitar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
