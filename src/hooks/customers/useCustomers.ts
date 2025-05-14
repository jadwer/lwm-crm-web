// Archivo: src/app/(crm)/dashboard/customers/hooks/useCustomers.ts

import useSWR from 'swr';
import axios from '@/lib/axiosClient';
import { Customer } from '@/interfaces/customer';

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export function useCustomers() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/customers', fetcher);

  const getCustomers = async () => {
    const res = await axios.get('/api/customers');
    return res.data.data;
  };

  const get = async (id: number) => {
    const res = await axios.get(`/api/customers/${id}`);
    return res.data.data;
  };

  const create = async (payload: Partial<Customer>) => {
    const res = await axios.post('/api/customers', payload);
    mutate();
    return res.data;
  };

  const update = async (id: number, payload: Partial<Customer>) => {
    const res = await axios.put(`/api/customers/${id}`, payload);
    mutate();
    return res.data;
  };

  const remove = async (id: number) => {
    await axios.delete(`/api/customers/${id}`);
    mutate();
  };

  return {
    customers: data ?? [],
    isLoading,
    isError: error,
    getCustomers,
    get,
    create,
    update,
    remove,
    mutate,
  };
}
