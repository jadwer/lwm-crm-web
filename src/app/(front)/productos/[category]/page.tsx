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
  params: { category: string };
}) => {

  const { category } = params;

  const [brands, setBrands] = useState<Brands>({} as Brands);
  const [queryBrandsId, setQueryBrandsId] = useState<number[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [categories, setCategories] = useState<Categories>({} as Categories);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [queryBrands, setQueryBrands] = useState<string>("");

  const [page, setPage] = useState<string>("");

  const { getCategories } = useCategories();

  useEffect(() => {
    async function getCat () {
      await getCategories({ setCategories });
    }
    getCat();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(categories).length !== 0) {
      categories.data.map((cat) => {
        if (cat.slug == category) {
          setCategoryId(cat.id);
          setSearchFilter(`?category=${categoryId}`);
        }
      });
    }
  }, [categories, category, categoryId]);

  useEffect(()=>{
    searchQueryBuilder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, page, queryBrandsId]);

  const searchQueryBuilder = () => {
    let pg = (page !== "") ? '?'+page : "?page=1";
    let cat = (categoryId !== undefined) ? '&category='+categoryId : "";
    let sstr = (searchString !== "") ? '&name='+searchString : "";
    let qb = (queryBrands !== "") ? queryBrands : "";
    let searchFS = pg+cat+sstr+qb;
    setSearchFilter(searchFS);
  }

  const catQuery = () => {
  }

  const pageQuery = (page : string) => {
    if(page.includes('?')){
      page = page.replace('?', '');
      setPage(page);
    }    
  }

  const brandsQuery = (updatedSelectedBrands:[]) => {
    let qbrands = "";
    updatedSelectedBrands.forEach((id)=>{
      if(id !== -1){
        qbrands += "&brand[]="+id;
      }
      return qbrands;
    })
    setQueryBrands(qbrands);
  }

  const searchQuery = (searchStr: string) => {
    setPage("");
    setSearchString(searchStr);
  }

  return (
    <main>
      <div className="container-fluid products-page">
        <div className="row">
          <SideBrands
            functions={{ setBrands, setQueryBrandsId, brandsQuery }}
            data={{
              brands,
              queryBrandsId,
            }}></SideBrands>

          <div className="col-12 col-md-10">
          <div className="row mb-4">
            <div className="col-md-1">Buscar:
            </div>
              <input type="text" id="searchProduct" className="col-md-10" placeholder="Introduzca el nombre del producto" value={searchString} onChange={(e) => {searchQuery(e.target.value)}}/>
          </div>

            <FilteredSearch data={{ searchFilter }} functions = {{pageQuery}} />

          </div>

          <EstimateBanner />
        </div>
      </div>
    </main>
  );
};
export default ProductoPage;
