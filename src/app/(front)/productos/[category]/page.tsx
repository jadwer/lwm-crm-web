"use client";
import EstimateBanner from "@/app/(front)/ui/estimate/estimateBanner";
import FilteredSearch from "@/app/(front)/ui/search/fiteredSearch";
import { Brands, Categories } from "@/lib/interfaces";
import { Suspense, useEffect, useState } from "react";
import SideBrands from "./sideBrands";
import { useCategories } from "@/hooks/categories";

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

  const [brands, setBrands] = useState<Brands>({} as Brands);
  const [queryBrandsId, setQueryBrandsId] = useState<number[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [categoryName, setCategoryName] = useState<string>(
    "Todos los productos"
  );
  const [categories, setCategories] = useState<Categories>({} as Categories);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [queryBrands, setQueryBrands] = useState<string>("");

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
    // console.log(categories);
    if (Object.keys(categories).length !== 0) {
      categories.data.map((cat) => {
        if (cat.slug == category) {
          //          console.log(cat.slug);
          setCategoryId(cat.id);
          setCategoryName(cat.name);
        }
      });
    }
  }, [categories, category, categoryId]);

  useEffect(() => {
    searchQueryBuilder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, page, queryBrandsId]);

  const searchQueryBuilder = () => {
    let pg = page !== "" ? "?" + page : "?page=1";
    let cat = categoryId !== undefined ? "&category=" + categoryId : "";
    let sstr = searchString !== "" ? "&name=" + searchString : "";
    let qb = queryBrands !== "" ? queryBrands : "";
    let searchFS = pg + cat + sstr + qb;
    setSearchFilter(searchFS);
  };

  const catQuery = () => {};

  const pageQuery = (page: string) => {
    if (page.includes("?")) {
      page = page.replace("?", "");
      setPage(page);
    }
  };

  const brandsQuery = (updatedSelectedBrands: []) => {
    let qbrands = "";
    updatedSelectedBrands.forEach((id) => {
      if (id !== -1) {
        qbrands += "&brand[]=" + id;
      }
      return qbrands;
    });
    setQueryBrands(qbrands);
  };

  const searchQuery = (searchStr: string) => {
    setPage("");
    setSearchString(searchStr);
  };

  return (
    <main>
      <div className="container-fluid hero-sections mx-auto">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">{<h1>{categoryName}</h1>}</div>
          </div>
        </div>
      </div>
      <div className="container-fluid products-page">
        <div className="row">
          <SideBrands
            functions={{ setBrands, setQueryBrandsId, brandsQuery }}
            data={{
              brands,
              queryBrandsId,
            }}></SideBrands>

          <div className="col-12 col-md-10">
            {/*

            <div className="form-group d-md-flex mb-4">
              <label className="col-12 col-sm-1 col-form-label">Buscar</label>
              <div className="col-12 col-sm-8">
                <input type="text" id="searchProduct" className="col-md-10 form-control" placeholder="Introduzca el nombre del producto" value={searchString} onChange={(e) => { searchQuery(e.target.value) }} />
              </div>
            </div>
            */}

            <FilteredSearch data={{ searchFilter }} functions={{ pageQuery }} />
          </div>
          <EstimateBanner />
        </div>
      </div>
    </main>
  );
};
export default ProductoPage;
