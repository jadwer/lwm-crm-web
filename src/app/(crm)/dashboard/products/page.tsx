"use client"

import FilteredSearch from "@/app/(crm)/ui/search/fiteredSearch"
import { Category, Brand } from "@/lib/interfaces"
import { Suspense, useEffect, useState } from "react"
import { useCategories } from "@/hooks/categories"
import Link from "next/link"
import SelectCategories from "../../ui/dropdownItems/selectCategoriesFilter"
import SelectBrands from "../../ui/dropdownItems/selectBrandsFilter"

const ProductoPage = ({
  searchParams,
  params,
}: {
  searchParams: {
    homeSearch: string
  }
  params: { category: string }
}) => {
  const { category } = params

  const [queryBrandsId, setQueryBrandsId] = useState<string[]>([])
  const [categoryId, setCategoryId] = useState<string>("")
  const [searchFilter, setSearchFilter] = useState<string>("")
  const [searchString, setSearchString] = useState<string>("")
  const [categoria, setCategoria] = useState<Category>({} as Category)
  const [marca, setMarca] = useState<Brand>({} as Brand)
  const [page, setPage] = useState<string>("")

  const { getCategories } = useCategories()

  useEffect(() => {
    getCategories({ setCategories: () => {} }) // omitimos set porque ya no usamos categorías aquí
    if (searchParams.homeSearch !== undefined) {
      setTimeout(() => {
        searchQuery(searchParams.homeSearch)
      }, 1500)
    }
  }, [])

  useEffect(() => {
    buildSearchQuery()
  }, [searchString, page, queryBrandsId, categoryId])

  const buildSearchQuery = () => {
    const params = new URLSearchParams()
    params.set("page", page || "1")
    if (categoryId) params.set("category", categoryId)
    if (searchString) params.set("name", searchString)
    if (queryBrandsId.length > 0) {
      queryBrandsId.forEach((id) => params.append("brand[]", id))
    }
    setSearchFilter("?" + params.toString())
  }

  const pageQuery = (newPage: string) => {
    if (newPage.includes("?page=")) {
      newPage = newPage.replace("?page=", "")
    }
    setPage(newPage)
  }

  const searchQuery = (searchStr: string) => {
    setPage("")
    setSearchString(searchStr)
  }

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Productos</h2>
            <h4>Todos los productos</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <Link href={"/dashboard/import-list"} className="btn btn-primary ms-2">
              Importar lista
            </Link>
            <Link href={"/dashboard/products/add/"} className="btn btn-primary ms-2">
              Agregar producto
            </Link>
          </div>
        </div>
      </div>

      <div className="container-fluid container-product">
        <div className="row back-header-2">
          <div className="col-12 col-md-3">
            <SelectCategories
              stateData={{ categoria, setCategoria, setCategoryId }}
              label="Filtro por categoría"
            />
          </div>
          <div className="col-12 col-md-3">
            <SelectBrands
              stateData={{ marca, setMarca, setQueryBrandsId }}
              label="Filtro por marca"
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                id="searchProduct"
                className="col-md-10 form-control"
                placeholder="Introduzca el nombre del producto"
                value={searchString}
                onChange={(e) => {
                  searchQuery(e.target.value)
                }}
              />
            </div>
          </div>
        </div>

        <FilteredSearch data={{ searchFilter }} functions={{ pageQuery, setPage }} />
      </div>
    </main>
  )
}

export default ProductoPage