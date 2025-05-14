// Archivo: src/components/AddToCartButton.tsx
"use client";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/lib/interfaces";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => addToCart(product)}
    >
      Agregar al carrito 🛒
    </button>
  );
}
