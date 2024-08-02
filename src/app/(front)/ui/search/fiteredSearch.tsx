"use client";
import { useProducts } from "@/hooks/products";
import { Product, Products } from "@/lib/interfaces";
import { useEffect, useState } from "react";

const FilteredSearch = (props: {data : {searchFilter : string}}) => {
  const searchFilter = props.data.searchFilter;

  const [productos, setProductos] = useState<Products>({} as Products);
  const { getFilteredProducts } = useProducts();

  useEffect(() => {
    getFilteredProducts({ setProductos }, searchFilter);
    console.log(searchFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  if (Object.keys(productos).length === 0) {
    return <>Cargando...</>;
  } else {
    return (
      <div className="container products">
        <div className="row products-list">
          {productos.data.map((producto: Product) => {
            return (
                <div className="col-12" key={producto.id}>
                  <p>
                    <span className="labels">
                      Marca: {producto.brand_id.name} | Categoría:{" "}
                      {producto.category_id.name}
                    </span>
                  </p>
                  <h6>{producto.name}</h6>
                  <a href={`producto/${producto.id}`}>VER DETALLE</a>
                  <hr></hr>
                </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default FilteredSearch;
