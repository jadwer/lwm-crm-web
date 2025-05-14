// Archivo: src/app/(crm)/dashboard/purchases/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { usePurchases } from '@/hooks/purchases/usePurchases';
import { useSuppliers } from '@/hooks/suppliers/useSuppliers';
import { useProducts } from '@/hooks/useProducts';
import { usePurchaseItems } from '@/hooks/purchases/usePurchaseItems';
import { PurchaseOrder, PurchaseOrderItem, ProductMini, Supplier } from '@/lib/interfaces';

export default function PurchaseDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<PurchaseOrder | null>(null);
  const [items, setItems] = useState<
    {
      quantity: number;
      unit_price: number;
      subtotal: number;
      product: ProductMini;
    }[]
  >([]);
  const [supplier, setSupplier] = useState<Supplier | null>(null);

  const { get: getOrder } = usePurchases();
  const { get: getSupplier } = useSuppliers();
  const { getProduct } = useProducts();
  const { getByOrderId } = usePurchaseItems();

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const orderId = parseInt(id.toString());

      const ord = await getOrder(orderId);
      const sup = await getSupplier(ord.supplier_id);
      const orderItems: PurchaseOrderItem[] = await getByOrderId(orderId);

      const enrichedItems = await Promise.all(
        orderItems.map(async (item) => {
          const prod = await getProduct(item.product_id);
          return {
            quantity: item.quantity,
            unit_price: typeof item.unit_price === 'string' ? parseFloat(item.unit_price) : item.unit_price,
            subtotal: typeof item.subtotal === 'string' ? parseFloat(item.subtotal) : item.subtotal,
            product: prod,
          };
        })
      );

      setOrder(ord);
      setSupplier(sup);
      setItems(enrichedItems);
    };

    load();
  }, [id]);

  if (!order) {
    return <p className="p-6 text-gray-500 italic">Cargando detalles de la orden...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Detalle de Orden de Compra #{order.id}</h1>

      <div className="bg-white border p-4 rounded shadow-sm">
        <p><strong>Proveedor:</strong> {supplier?.name}</p>
        <p><strong>Fecha:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
        <p><strong>Estatus:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.total_amount}</p>
        {order.notes && (
          <p><strong>Notas:</strong> {order.notes}</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Productos</h2>

        {items.length === 0 ? (
          <p className="text-gray-500 italic">Esta orden no contiene productos.</p>
        ) : (
          <div className="grid gap-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border p-4 rounded bg-white shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {item.product.img_path && (
                    <img
                      src={item.product.img_path}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-500">SKU: {item.product.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">Cantidad: <strong>{item.quantity}</strong></p>
                  <p className="text-sm">Precio unitario: ${item.unit_price.toFixed(2)}</p>
                  <p className="text-sm font-semibold">Subtotal: ${item.subtotal.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
