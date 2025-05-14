// Archivo: src/app/(crm)/dashboard/sales/SalesDetail.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSalesItems } from '@/hooks/sales/useSalesItems';
import axios from '@/lib/axiosClient';
import { SalesOrder, SalesOrderItem, Product } from '@/lib/interfaces';

interface Props {
  orderId: number;
  onBack: () => void;
}

interface ProductExtended extends Product {
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export default function SalesDetail({ orderId, onBack }: Props) {
  const { getByOrderId } = useSalesItems();
  const [items, setItems] = useState<ProductExtended[]>([]);
  const [order, setOrder] = useState<SalesOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`/api/sales-orders/${orderId}`);
        setOrder(res.data);

        const orderItems: SalesOrderItem[] = await getByOrderId(orderId);

        const enriched = await Promise.all(
          orderItems.map(async (item) => {
            const productRes = await axios.get(`/api/products/${item.product_id}`);
            return {
              ...productRes.data,
              quantity: item.quantity,
              unit_price: parseFloat(item.unit_price),
              subtotal: parseFloat(item.subtotal),
            };
          })
        );

        setItems(enriched);
      } catch (err) {
        console.error('Error cargando orden o productos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [orderId]);

  return (
    <div className="container py-4">
      <h4>Detalle de Venta (ID: {orderId})</h4>
      <button onClick={onBack} className="btn btn-secondary mb-3">← Regresar</button>

      {order && (
        <div className="alert alert-light border mb-4">
          <p><strong>Total:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
          {order.notes && <p><strong>Notas:</strong> {order.notes}</p>}
        </div>
      )}

      {loading ? (
        <p>Cargando productos...</p>
      ) : items.length === 0 ? (
        <p className="text-muted">No hay productos en esta venta.</p>
      ) : (
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`${item.id}-${index}`}>
                <td>
                  {item.img_path ? (
                    <img
                      src={item.img_path}
                      alt={item.name}
                      width={64}
                      height={64}
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <span className="text-muted">Sin imagen</span>
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.unit_price.toFixed(2)}</td>
                <td>${item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
