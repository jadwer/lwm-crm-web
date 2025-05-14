// Archivo: src/app/(crm)/dashboard/purchases/PurchaseForm.tsx

'use client';

import { useEffect, useState } from 'react';
import { PurchaseOrder, ProductMini, Supplier, PurchaseOrderItem } from '@/lib/interfaces';
import { useProducts } from '@/hooks/erp/useProducts';
import { usePurchaseItems } from '@/hooks/purchases/usePurchaseItems';
import PurchaseProductTable from './PurchaseProductTable';

interface Props {
  onSubmit: (data: Partial<PurchaseOrder>, items: ProductMini[]) => void;
  onCancel: () => void;
  suppliers: Supplier[];
  initialData?: PurchaseOrder | null;
}

export default function PurchaseForm({ onSubmit, onCancel, suppliers, initialData }: Props) {
  const [form, setForm] = useState<Partial<PurchaseOrder>>({
    supplier_id: 0,
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
  const { getByOrderId } = usePurchaseItems();

  useEffect(() => {
    const load = async () => {
      if (initialData) {
        setForm(initialData);

        try {
          const orderItems: PurchaseOrderItem[] = await getByOrderId(initialData.id);

          const enriched: ProductMini[] = await Promise.all(
            orderItems.map(async (item) => {
              const product = await getProduct(item.product_id);
              return {
                ...product,
                quantity: item.quantity,
                unit_price: typeof item.unit_price === 'string' ? parseFloat(item.unit_price) : item.unit_price,
                subtotal: typeof item.subtotal === 'string' ? parseFloat(item.subtotal) : item.subtotal,
              };
            })
          );

          setItems(enriched);
        } catch (error) {
          console.error('Error al cargar productos de la orden:', error);
        }
      }
    };

    load();
  }, [initialData]);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    setForm(prev => ({ ...prev, total_amount: total }));
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    console.log('skuSearch', skuSearch);
    const results = await getFilteredProducts(`/?name=${skuSearch}`);
    console.log('results', results);
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

  const existing = items.find(p => p.id === productResult.id);

  if (existing) {
    setItems(prev =>
      prev.map(p =>
        p.id === productResult.id
          ? {
              ...p,
              quantity: (p.quantity || 0) + quantity,
              unit_price, // 🛠️ aseguramos el precio
              subtotal: ((p.quantity || 0) + quantity) * unit_price,
            }
          : p
      )
    );
  } else {
    setItems(prev => [
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
    setItems(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, items);
  };

  return (
<form
  onSubmit={handleSubmit}
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '1rem',
    background: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '900px',
    margin: '0 auto'
  }}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h3>Nueva Orden de Compra</h3>

    <label>
      Proveedor:
      <select
        name="supplier_id"
        value={form.supplier_id}
        onChange={handleChange}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
      >
        <option value={0}>Selecciona un proveedor</option>
        {suppliers.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
    </label>

    <label>
      Fecha:
      <input
        type="date"
        name="order_date"
        value={form.order_date}
        onChange={handleChange}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
      />
    </label>

    <label>
      Notas:
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        rows={2}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
      />
    </label>
  </div>

  <div>
    <h4>Agregar Productos</h4>

    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        type="text"
        value={skuSearch}
        onChange={(e) => setSkuSearch(e.target.value)}
        placeholder="Buscar por SKU"
        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px' }}
      />
      <button
        type="button"
        onClick={handleSearch}
        style={{ padding: '0.5rem 1rem', background: '#ccc', border: 'none', borderRadius: '4px' }}
      >
        Buscar
      </button>
    </div>

    {productResult && (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          background: '#f9f9f9',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          marginBottom: '1rem'
        }}
      >
        {productResult.img_path && (
          <img
            src={productResult.img_path}
            alt={productResult.name}
            width={64}
            height={64}
            style={{ objectFit: 'contain', borderRadius: '4px' }}
          />
        )}
        <div style={{ flex: 1 }}>
          <strong>{productResult.name}</strong><br />
          <small className="text-muted">SKU: {productResult.sku}</small>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <label style={{ margin: 0 }}>Cantidad:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{ width: '5rem', padding: '0.3rem' }}
            />
            <button
              type="button"
              onClick={handleAddProduct}
              style={{
                padding: '0.5rem 1rem',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    )}
  </div>

  <div>
    <PurchaseProductTable items={items} onDelete={handleDelete} />
  </div>

<div style={{
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '1rem',
  fontSize: '1.2rem',
  fontWeight: 'bold'
}}>
  Total: ${form.total_amount?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
</div>

  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
    <button type="submit" style={{ background: '#28a745', color: 'white', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px' }}>
      Guardar Orden
    </button>
    <button type="button" onClick={onCancel} style={{ padding: '0.5rem 1.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
      Cancelar
    </button>
  </div>
</form>

);
}
