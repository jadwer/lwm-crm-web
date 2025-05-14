// Archivo: src/app/(front)/carrito/page.tsx
"use client";
import { useCart } from "@/hooks/useCart";

export default function CarritoPage() {
  const { cartItems, increment, decrement, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Tu carrito de compras</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Aún no has agregado productos al carrito.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <li key={item.id} className="border rounded p-4 shadow flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">SKU: {item.sku}</p>
                  <p className="text-gray-800 font-bold">${item.price.toFixed(2)}</p>
                  <div className="mt-2 flex gap-2 items-center">
                    <button onClick={() => decrement(item.id)} className="bg-gray-200 px-2 rounded">➖</button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => increment(item.id)} className="bg-gray-200 px-2 rounded">➕</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xl font-bold">❌</button>
              </li>
            ))}
          </ul>

          <div className="text-right">
            <p className="text-2xl font-semibold mb-4">Subtotal: ${subtotal.toFixed(2)}</p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700"
              onClick={() => alert('Función de cotizar próximamente disponible')}
            >
              Generar cotización 📄
            </button>
          </div>
        </>
      )}
    </div>
  );
}
