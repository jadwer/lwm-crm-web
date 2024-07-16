/* 'use client';

import { FALLBACK_STRING, useDynamicParams } from 'next-static-utils';
import ProductoTemplate from "./producto.html"


const ProductoClientPage = () => {
  const { id } = useDynamicParams();

  if (id === FALLBACK_STRING) return null;

  return (
    <ProductoTemplate />
  )
}

export default ProductoClientPage */