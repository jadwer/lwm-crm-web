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

    const existing = items.find(p => p.id === productResult.id);
    if (existing) {
      setItems(prev =>
        prev.map(p =>
          p.id === productResult.id
            ? {
                ...p,
                quantity: (p.quantity || 0) + quantity,
                subtotal: ((p.quantity || 0) + quantity) * (p.unit_price || 0),
              }
            : p
        )
      );
    } else {
      const subtotal = (productResult.unit_price || 0) * quantity;
      setItems(prev => [...prev, { ...productResult, quantity, subtotal }]);
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Nueva Orden de Compra</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Proveedor</label>
          <select
            name="supplier_id"
            value={form.supplier_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value={0}>Selecciona un proveedor</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha</label>
          <input
            type="date"
            name="order_date"
            value={form.order_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notas</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold">Agregar Productos</h3>

      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Buscar por SKU</label>
          <input
            type="text"
            placeholder="Ej. SKU12345"
            value={skuSearch}
            onChange={e => setSkuSearch(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <button type="button" onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Buscar
          </button>
        </div>

{productResult && (
  <>
    <div className="flex items-center gap-4 md:col-span-2 bg-gray-50 p-4 rounded border border-green-200">
      {productResult.img_path && (
        <img
          src={productResult.img_path}
          alt={productResult.name}
          className="w-16 h-16 object-cover rounded border"
        />
      )}
      <div>
        <p className="text-sm text-green-700 font-medium">
          Producto encontrado: <strong>{productResult.name}</strong>
        </p>
        <p className="text-xs text-gray-500">SKU: {productResult.sku}</p>
      </div>
    </div>

    <div className="flex-1">
      <label className="block text-sm font-medium mb-1">Cantidad</label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={e => setQuantity(parseInt(e.target.value))}
        className="w-full border p-2 rounded"
      />
    </div>

    <div>
      <label className="block invisible text-sm font-medium mb-1">Agregar</label>
      <button
        type="button"
        onClick={handleAddProduct}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Agregar
      </button>
    </div>
  </>
)}      </div>

      {error && <p className="text-red-600">{error}</p>}

      <PurchaseProductTable items={items} onDelete={handleDelete} />

      <div className="flex justify-between items-center border-t pt-4">
        <strong>Total: ${form.total_amount?.toFixed(2)}</strong>
        <div className="space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Guardar
          </button>
          <button type="button" onClick={onCancel} className="text-gray-600 hover:underline">
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}
