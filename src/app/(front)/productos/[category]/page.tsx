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
        if (cat.slug === params.category) {
          setCategory(cat.id);
        }
      });
      setSearchFilter('?category='+category);
    }
  }, [categories]);

  const searchQueryBuilder = (e : Event, id : string) => {
    if(id.includes('?')){
      id = id.replace('?', '');
    }
    setSearchFilter('?category='+category+'&'+id);
  }
  console.log(searchFilter);

  return (
    <main>
      <div className="container-fluid products-page">
        <div className="row">
          <SideBrands
            functions={{ setBrands, setSelectedBrands, setQueryBrandsId }}
            data={{
              brands,
              selectedBrands,
              queryBrandsId,
            }}></SideBrands>

          <div className="col-12 col-md-10">

            <FilteredSearch data={{ searchFilter }} functions = {{searchQueryBuilder}} />

          </div>

          <EstimateBanner />
        </div>
      </div>
    </main>
  );
};
export default ProductoPage;
