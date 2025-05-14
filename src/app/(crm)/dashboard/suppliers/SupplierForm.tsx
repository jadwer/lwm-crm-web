// Archivo: src/app/(crm)/dashboard/suppliers/SupplierForm.tsx

import { useState, useEffect } from 'react';
import { Supplier } from '@/lib/interfaces';

interface Props {
  onSubmit: (data: Partial<Supplier>) => void;
  onCancel: () => void;
  initialData?: Supplier | null;
}

export default function SupplierForm({ onSubmit, onCancel, initialData }: Props) {
  const [form, setForm] = useState<Partial<Supplier>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    rfc: '',
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-300 rounded">
      <div>
        <label className="block mb-1">Nombre</label>
        <input type="text" name="name" value={form.name || ''} onChange={handleChange} className="w-full border px-2 py-1" required />
      </div>
      <div>
        <label className="block mb-1">Correo</label>
        <input type="email" name="email" value={form.email || ''} onChange={handleChange} className="w-full border px-2 py-1" required />
      </div>
      <div>
        <label className="block mb-1">Teléfono</label>
        <input type="text" name="phone" value={form.phone || ''} onChange={handleChange} className="w-full border px-2 py-1" required />
      </div>
      <div>
        <label className="block mb-1">Dirección</label>
        <input type="text" name="address" value={form.address || ''} onChange={handleChange} className="w-full border px-2 py-1" required />
      </div>
      <div>
        <label className="block mb-1">RFC</label>
        <input type="text" name="rfc" value={form.rfc || ''} onChange={handleChange} className="w-full border px-2 py-1" required />
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="text-gray-600">Cancelar</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Guardar</button>
      </div>
    </form>
  );
}
