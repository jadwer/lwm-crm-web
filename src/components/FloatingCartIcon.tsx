// Archivo: src/components/FloatingCartIcon.tsx
"use client";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function FloatingCartIcon() {
  const { cartItems } = useCart();

  return (
    <Link
      href="/carrito"
      className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg z-50"
    >
      🛒 {cartItems.length}
    </Link>
  );
}
