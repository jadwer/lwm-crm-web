// Archivo: useSales.ts

import useSWR from 'swr';
import axios from '@/lib/axiosClient';
import { SalesOrder, SalesOrderItem } from '@/lib/interfaces';

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export function useSales() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/sales-orders', fetcher);

  const get = async (id: number) => {
    const res = await axios.get(`/api/sales-orders/${id}`);
    return res.data;
  };

  const create = async (
    payload: Partial<SalesOrder> & { items: SalesOrderItem[] }
  ) => {
    const total_amount = payload.items?.reduce(
      (sum, item) => sum + ((item.unit_price ?? 0) * (item.quantity ?? 0)),
      0
    );

    const res = await axios.post('/api/sales-orders', {
      ...payload,
      total_amount,
    });

    mutate();
    return res.data;
  };

  const update = async (id: number, payload: Partial<SalesOrder>) => {
    const res = await axios.put(`/api/sales-orders/${id}`, payload);
    mutate();
    return res.data;
  };

  const remove = async (id: number) => {
    await axios.delete(`/api/sales-orders/${id}`);
    mutate();
  };

  return {
    sales: data ?? [],
    isLoading,
    isError: error,
    get,
    create,
    update,
    remove,
    mutate,
  };
}
