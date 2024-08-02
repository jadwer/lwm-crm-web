"use client";
import EstimateBanner from "@/app/(front)/ui/estimate/estimateBanner";
import FilteredSearch from "@/app/(front)/ui/search/fiteredSearch";
import { Brands, Categories } from "@/lib/interfaces";
import { Suspense, useEffect, useState } from "react";
import SideBrands from "./sideBrands";
import { useCategories } from "@/hooks/categories";

const ProductoPage = ({
  params,
}: {
  params: { category: string; page: number; brands?: string[] };
}) => {
  const page = params.page;
  const queryBrands = params.brands !== null ? params.brands : [];
  const [queryBrandsId, setQueryBrandsId] = useState<number[]>([]);
  const [category, setCategory] = useState<number>();
  const [categories, setCategories] = useState<Categories>({} as Categories);
  const [selectedBrands, setSelectedBrands] = useState<boolean[]>([]);
  const [brands, setBrands] = useState<Brands>({} as Brands);
  const [searchString, setSearchString] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const { getCategories } = useCategories();

  useEffect(() => {
    getCategories({ setCategories });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (Object.keys(categories).length !== 0) {
      categories.data.map((cat) => {
        if (cat.name === params.category) {
          setCategory(cat.id);
        }
      });
      setSearchFilter(searchQueryBuilder(page, category, queryBrandsId, searchString));
      //console.log(searchFilter);
    }
  }, [selectedBrands, categories, queryBrandsId]);

  const searchQueryBuilder = (
    page: number,
    category: number,
    brandsIds: number[],
    searchString: string
  ) => {
    let query = "";

    query += `?category=${category}`;
    query += `&page=${page}`;
    query += (searchString !== "")? `&name=${searchString}` : "";
    brandsIds.map((i) => {
      query += `&brand[]=${i}`;
    });
    return query;
  };

  return (
    <main>
      <div className="container-fluid products-page">
        <div className="row">
          <SideBrands
            functions={{ setBrands, setSelectedBrands, setQueryBrandsId }}
            data={{
              brands,
              selectedBrands,
              queryBrands,
              queryBrandsId,
            }}></SideBrands>

          <div className="col-12 col-md-10">
            <div className="row mb-4">
              <div className="col mb-4">AQUÍ VAN LOS FILTROS</div>
            </div>

            <FilteredSearch data={{ searchFilter }} />

            <div className="row mb-4">
              <div className="col mb-4">AQUÍ VAN LOS FILTROS</div>
            </div>
          </div>

          <EstimateBanner />
        </div>
      </div>
    </main>
  );
};
export default ProductoPage;
