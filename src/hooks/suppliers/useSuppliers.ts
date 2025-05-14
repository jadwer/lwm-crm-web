// Archivo: src/app/hooks/suppliers/useSuppliers.ts

import useSWR from 'swr';
import axios from '@/lib/axiosClient';
import { Supplier } from '@/lib/interfaces';

const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export function useSuppliers() {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/suppliers', fetcher);

  const getSuppliers = async () => {
    const res = await axios.get('/api/suppliers');
    return res.data.data;
  };

  const get = async (id: number) => {
    const res = await axios.get(`/api/suppliers/${id}`);
    return res.data.data;
  };

  const create = async (payload: Partial<Supplier>) => {
    const res = await axios.post('/api/suppliers', payload);
    mutate();
    return res.data;
  };

  const update = async (id: number, payload: Partial<Supplier>) => {
    const res = await axios.put(`/api/suppliers/${id}`, payload);
    mutate();
    return res.data;
  };

  const remove = async (id: number) => {
    await axios.delete(`/api/suppliers/${id}`);
    mutate();
  };

  return {
    suppliers: data ?? [],
    isLoading,
    isError: error,
    getSuppliers,
    get,
    create,
    update,
    remove,
    mutate,
  };
}
