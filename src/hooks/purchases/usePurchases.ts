// Archivo: src/hooks/purchases/usePurchases.ts

import useSWR from 'swr';
import axios from '@/lib/axiosClient';
import { PurchaseOrder } from '@/lib/interfaces';

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

  const create = async (payload: Partial<PurchaseOrder>) => {
    const res = await axios.post('/api/purchase-orders', payload);
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
