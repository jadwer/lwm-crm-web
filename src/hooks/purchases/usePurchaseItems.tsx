// Archivo: src/hooks/purchases/usePurchaseItems.ts

import useSWR from 'swr';
import axios from '@/lib/axiosClient';
import { PurchaseOrderItem } from '@/lib/interfaces';

interface PurchaseOrderItemParams {
  purchase_order_id: number;
  page?: number;
}

interface PurchaseOrderItemsResponse {
  data: PurchaseOrderItem[];
  total: number;
  current_page: number;
  last_page: number;
}

const fetcher = (url: string) =>
  axios.get(url).then(res => res.data);

export function usePurchaseItems({ purchase_order_id, page = 1 }: PurchaseOrderItemParams = { purchase_order_id: 0 }) {
  const url = `/api/purchase-order-items?purchase_order_id=${purchase_order_id}&page=${page}`;

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<PurchaseOrderItemsResponse>(purchase_order_id ? url : null, fetcher);

  const create = async (payload: Partial<PurchaseOrderItem>) => {
    const res = await axios.post('/api/purchase-order-items', payload);
    mutate();
    return res.data;
  };

  const update = async (id: number, payload: Partial<PurchaseOrderItem>) => {
    const res = await axios.put(`/api/purchase-order-items/${id}`, payload);
    mutate();
    return res.data;
  };

  const remove = async (id: number) => {
    await axios.delete(`/api/purchase-order-items/${id}`);
    mutate();
  };

  const getByOrderId = async (purchase_order_id: number): Promise<PurchaseOrderItem[]> => {
    const res = await axios.get(`/api/purchase-order-items?purchase_order_id=${purchase_order_id}`);
    return res.data.data; // ✅ ← ¡Esto era lo que faltaba!
  };

  return {
    items: data?.data ?? [],
    pagination: {
      total: data?.total ?? 0,
      currentPage: data?.current_page ?? 1,
      lastPage: data?.last_page ?? 1,
    },
    isLoading,
    isError: error,
    create,
    update,
    remove,
    getByOrderId,
    mutate,
  };
}
