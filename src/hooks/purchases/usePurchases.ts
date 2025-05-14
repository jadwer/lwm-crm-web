// Archivo: src/hooks/purchases/usePurchases.ts

import useSWR from 'swr';
import axios from '@/lib/axiosClient';
import { PurchaseOrder, PurchaseOrderItem } from '@/lib/interfaces';

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export function usePurchases() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/purchase-orders', fetcher);

  const get = async (id: number) => {
    const res = await axios.get(`/api/purchase-orders/${id}`);
    return res.data;
  };

  const create = async (
    payload: Partial<PurchaseOrder> & { items: PurchaseOrderItem[] }
  ) => {
    const total_amount = payload.items?.reduce(
      (sum, item) => sum + ((item.unit_price ?? 0) * (item.quantity ?? 0)),
      0
    );

    const res = await axios.post('/api/purchase-orders', {
      ...payload,
      total_amount,
    });

    mutate();
    return res.data;
  };

  const update = async (id: number, payload: Partial<PurchaseOrder>) => {
    const res = await axios.put(`/api/purchase-orders/${id}`, payload);
    mutate();
    return res.data;
  };

  const remove = async (id: number) => {
    await axios.delete(`/api/purchase-orders/${id}`);
    mutate();
  };

  return {
    purchases: data ?? [],
    isLoading,
    isError: error,
    get,
    create,
    update,
    remove,
    mutate,
  };
}
