// Archivo: src/app/(crm)/dashboard/purchases/ProductRow.tsx

import { ProductMini } from '@/lib/interfaces';

interface Props {
  product: ProductMini;
  quantity: number;
  unitPrice: number;
  onRemove: () => void;
}

export default function ProductRow({ product, quantity, unitPrice, onRemove }: Props) {
  return (
    <tr>
      <td className="border p-2">
        <img src={product.img_path} alt={product.name} className="w-12 h-12 object-cover rounded" />
      </td>
      <td className="border p-2">
        <a
          href={`/producto/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {product.name}
        </a>
      </td>
      <td className="border p-2 text-right">${unitPrice.toFixed(2)}</td>
      <td className="border p-2 text-center">{quantity}</td>
      <td className="border p-2 text-right">${(unitPrice * quantity).toFixed(2)}</td>
      <td className="border p-2 text-center">
        <button onClick={onRemove} className="text-red-500 hover:underline">
          Quitar
        </button>
      </td>
    </tr>
  );
}
