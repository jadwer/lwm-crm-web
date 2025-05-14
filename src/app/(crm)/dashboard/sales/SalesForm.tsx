// Archivo: SalesForm.tsx

'use client';

import { useEffect, useState } from 'react';
import { SalesOrder, ProductMini, Customer, SalesOrderItem } from '@/lib/interfaces';
import { useProducts } from '@/hooks/erp/useProducts';
import { useSalesItems } from '@/hooks/sales/useSalesItems';
import SalesProductTable from './SalesProductTable';

interface Props {
  onSubmit: (data: Partial<SalesOrder>, items: ProductMini[]) => void;
  onCancel: () => void;
  customers: Customer[];
  initialData?: SalesOrder | null;
}

export default function SalesForm({ onSubmit, onCancel, customers, initialData }: Props) {
  const [form, setForm] = useState<Partial<SalesOrder>>({
    customer_id: 0,
    order_date: '',
    status: 'pending',
    total_amount: 0,
    notes: '',
  });

  const [items, setItems] = useState<ProductMini[]>([]);
  const [skuSearch, setSkuSearch] = useState('');
  const [productResult, setProductResult] = useState<ProductMini | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const { getFilteredProducts, getProduct } = useProducts();
  const { getByOrderId } = useSalesItems();

  useEffect(() => {
    const load = async () => {
      if (initialData) {
        setForm(initialData);
        try {
          const orderItems: SalesOrderItem[] = await getByOrderId(initialData.id);
          const enriched: ProductMini[] = await Promise.all(
            orderItems.map(async (item) => {
              const product = await getProduct(item.product_id);
              return {
                ...product,
                quantity: item.quantity,
                unit_price: parseFloat(item.unit_price),
                subtotal: parseFloat(item.subtotal),
              };
            })
          );
          setItems(enriched);
        } catch (err) {
          console.error('Error al cargar ítems:', err);
        }
      }
    };
    load();
  }, [initialData]);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    setForm((prev) => ({ ...prev, total_amount: total }));
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const results = await getFilteredProducts(`/?name=${skuSearch}`);
    if (results.length > 0) {
      setProductResult(results[0]);
      setError('');
    } else {
      setProductResult(null);
      setError('Producto no encontrado');
    }
  };

  const handleAddProduct = () => {
    if (!productResult || quantity <= 0) return;
    const unit_price = productResult.price ?? 0;
    const subtotal = unit_price * quantity;
    const existing = items.find((p) => p.id === productResult.id);
    if (existing) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === productResult.id
            ? {
                ...p,
                quantity: (p.quantity || 0) + quantity,
                unit_price,
                subtotal: ((p.quantity || 0) + quantity) * unit_price,
              }
            : p
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: productResult.id,
          name: productResult.name,
          sku: productResult.sku,
          quantity,
          unit_price,
          subtotal,
          img_path: productResult.img_path,
          datasheet_path: productResult.datasheet_path,
          category_id: productResult.category_id,
          brand_id: productResult.brand_id,
          unit_id: productResult.unit_id,
        },
      ]);
    }

    setProductResult(null);
    setSkuSearch('');
    setQuantity(1);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, items);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h4>Nueva Orden de Venta</h4>

      <label>
        Cliente:
        <select name="customer_id" value={form.customer_id} onChange={handleChange} className="form-select">
          <option value={0}>Selecciona un cliente</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

      <label>
        Fecha:
        <input type="date" name="order_date" value={form.order_date} onChange={handleChange} className="form-control" />
      </label>

      <label>
        Notas:
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className="form-control" />
      </label>

      <hr />

      <h5>Agregar Productos</h5>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input type="text" value={skuSearch} onChange={(e) => setSkuSearch(e.target.value)} placeholder="Buscar por SKU" className="form-control" />
        <button type="button" onClick={handleSearch} className="btn btn-outline-secondary">Buscar</button>
      </div>

      {productResult && (
        <div className="card p-3">
          <div><strong>{productResult.name}</strong> <small className="text-muted">({productResult.sku})</small></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <label className="form-label m-0">Cantidad:</label>
            <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="form-control w-auto" />
            <button type="button" onClick={handleAddProduct} className="btn btn-success">Agregar</button>
          </div>
        </div>
      )}

      <SalesProductTable items={items} onDelete={handleDelete} />

      <div style={{ textAlign: 'right', fontWeight: 'bold' }}>Total: ${form.total_amount?.toFixed(2)}</div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary">Guardar Orden</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
