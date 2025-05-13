// src/hooks/useProducts.ts

import useSWR from 'swr'
import axios from '@/lib/axiosClient'
import { Product, ProductsPaginated } from '@/lib/interfaces'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/products', fetcher)

  const getProduct = async (id: number): Promise<Product> => {
    const res = await axios.get(`/api/products/${id}`)
    return res.data.data
  }

  const getFilteredProducts = async (searchFilter: string): Promise<ProductsPaginated> => {
    console.log(`/api/products${searchFilter}`)
    const res = await axios.get(`/api/products${searchFilter}`)
    console.log(res.data)
    return res.data
  }

  const createProduct = async (producto: FormData) => {
    const res = await axios.post('/api/products', producto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    mutate()
    return res.data
  }

  const updateProduct = async (id: number, producto: FormData) => {
    const res = await axios.patch(`/api/products/${id}`, producto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    mutate()
    return res.data
  }

  const deleteProduct = async (id: number) => {
    await axios.delete(`/api/products/${id}`)
    mutate()
  }

  return {
    products: data ?? [],
    isLoading,
    isError: error,
    mutate,
    getProduct,
    getFilteredProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}