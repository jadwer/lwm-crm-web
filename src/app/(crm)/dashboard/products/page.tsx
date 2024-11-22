"use client";
import FilteredSearch from "@/app/(crm)/ui/search/fiteredSearch";
import { Brand, Brands, Categories, Category } from "@/lib/interfaces";
import { Suspense, useEffect, useState } from "react";
import { useCategories } from "@/hooks/categories";
import Link from "next/link";
import SelectCategories from "../../ui/dropdownItems/selectCategoriesFilter";
import SelectBrands from "../../ui/dropdownItems/selectBrandsFilter";

const ProductoPage = ({
  searchParams,
  params,
}: {
  searchParams: {
    homeSearch: string;
  };
  params: { category: string };
}) => {
  //  console.log(searchParams.homeSearch)

  const { category } = params;

  const [queryBrandsId, setQueryBrandsId] = useState<number[] | string>("");
  const [categoryId, setCategoryId] = useState<number | string>();
  const [categories, setCategories] = useState<Categories>({} as Categories);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [categoria, setCategoria] = useState<Category>({} as Category);
  const [marca, setMarca] = useState<Brand>({} as Brand);

  const [page, setPage] = useState<string>("");

  const { getCategories } = useCategories();

  useEffect(() => {
    getCategories({ setCategories });
    if (searchParams.homeSearch !== undefined) {
      //      console.log(searchParams.homeSearch)
      setTimeout(() => {
        searchQuery(searchParams.homeSearch);
      }, 1500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(categories);
    if (Object.keys(categories).length !== 0) {
      categories.data.map((cat) => {
        if (cat.slug == category) {
          console.log(cat.slug);
          setCategoryId(cat.id);
        }
      });
    }
  }, [categories, category, categoryId]);

  useEffect(() => {
    searchQueryBuilder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, page, queryBrandsId, categoryId]);

  const searchQueryBuilder = () => {
    let pg = page !== "" ? "?" + page : "?page=1";
    let cat = categoryId !== undefined ? ( categoryId !== "" ? "&category=" + categoryId : "") : "";
    let sstr = searchString !== "" ? "&name=" + searchString : "";
    let qb = queryBrandsId !== undefined ? ( queryBrandsId !== "" ? "&brand[]=" + queryBrandsId : "") : "";
    let searchFS = pg + cat + sstr + qb;
    setSearchFilter(searchFS);
  };


  const pageQuery = (page: string) => {
    if (page.includes("?")) {
      page = page.replace("?", "");
      setPage(page);
    }
  };


  const searchQuery = (searchStr: string) => {
    setPage("");
    setSearchString(searchStr);
  };

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Productos</h2>
            <h4>Todos los productos</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <Link
              href={"/dashboard/import-list"}
              className="btn btn-primary ms-2">
              Importar lista
            </Link>
            <Link
              href={"/dashboard/add-product"}
              className="btn btn-primary ms-2">
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
                  searchQuery(e.target.value);
                }}
              />

            </div>
          </div>
        </div>

        <FilteredSearch data={{ searchFilter }} functions={{ pageQuery, setPage }} />
      </div>
    </main>
  );
};
export default ProductoPage;

/*
'use client'
import { Suspense, useEffect, useState } from "react"
import { Brand, Category, Products, Unit } from "@/lib/interfaces";
import ProductsTemplate from "./products.html"
import { useProducts } from "@/hooks/products";

const ProductsPage = () => {
  const {getFilteredProducts} = useProducts();
  
  const [productos, setProductos] = useState<Products[]>([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    getFilteredProducts({setProductos}, searchFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  const searchQueryBuilder = (e : Event, id : string) => {
    setSearchFilter(id);
  }


  if(Object.keys(productos).length === 0){
    return (
      <Suspense>
        <h2>Loading...</h2>
      </Suspense>
    )
  } else {
    return (
      <Suspense>
        <ProductsTemplate data={{productos}} functions={ {searchQueryBuilder} }/>
      </Suspense>
    )
  }
}

export default ProductsPage
*/
