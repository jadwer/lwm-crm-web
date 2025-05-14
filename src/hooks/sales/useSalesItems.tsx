// Archivo: useSalesItems.tsx

import useSWR from 'swr';
import axios from '@/lib/axiosClient';
import { SalesOrderItem, SalesOrderItemParams, SalesOrderItemsResponse } from '@/lib/interfaces';


const fetcher = (url: string) =>
  axios.get(url).then(res => res.data);

export function useSalesItems({ sales_order_id, page = 1 }: SalesOrderItemParams = { sales_order_id: 0 }) {
  const url = `/api/sales-order-items?sales_order_id=${sales_order_id}&page=${page}`;

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<SalesOrderItemsResponse>(sales_order_id ? url : null, fetcher);

  const create = async (payload: Partial<SalesOrderItem>) => {
    const res = await axios.post('/api/sales-order-items', payload);
    mutate();
    return res.data;
  };

  const update = async (id: number, payload: Partial<SalesOrderItem>) => {
    const res = await axios.put(`/api/sales-order-items/${id}`, payload);
    mutate();
    return res.data;
  };

  const remove = async (id: number) => {
    await axios.delete(`/api/sales-order-items/${id}`);
    mutate();
  };

  const getByOrderId = async (sales_order_id: number): Promise<SalesOrderItem[]> => {
    const res = await axios.get(`/api/sales-order-items?sales_order_id=${sales_order_id}`);
    return res.data?.data ?? [];
  };

  return {
    items: data?.data ?? [],
    isLoading,
    isError: error,
    create,
    update,
    remove,
    mutate,
    getByOrderId,
  };
}
