// Archivo: src/app/(crm)/ui/search/fiteredSearch.tsx

"use client";
import Paginator from "@/app/(crm)/ui/paginator/paginator";
import { useProducts } from "@/hooks/products";
import { Product, Products } from "@/lib/interfaces";
import { useEffect, useState } from "react";

const FilteredSearch = (props: any) => {
  const searchFilter = props.data.searchFilter;
  const pageQuery = props.functions.pageQuery;

  const [productos, setProductos] = useState<Products>({} as Products);
  const { getFilteredProducts } = useProducts();

  useEffect(() => {
    getFilteredProducts({ setProductos }, searchFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  if (Object.keys(productos).length === 0 || !productos.data) {

    return <>Cargando...</>;
  }

  const metaData = productos;

  console.log("🔍 searchFilter actual:", searchFilter);
  console.log("🧩 Productos recibidos para mostrar:", productos.data);

  return (
    <>
      <p>✅ Hay {productos.data.length} productos para renderizar</p>

      <div className="container products filtered">
        <div className="row">
          {productos.data.map((producto: Product) => {
            const showPrice = producto.price && producto.price !== 0;

            return (
              <div className="col-12 col-md-4 card-products" key={producto.id}>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    "/storage/products/" +
                    producto.img_path
                  }
                  className="img-fluid"
                  alt="Labor Wasser México"
                />

                <div className="product-card-inner">
                  <p>
                    <span className="labels">
                      Marca: {producto.brand_id.name} | Categoría: {producto.category_id.name}
                    </span>
                  </p>
                  <h6>{producto.name}</h6>
                  {showPrice && (
                    <h5>${producto.price.toFixed(2)}</h5>
                  )}
                  <a href={`/producto/${producto.id}`} target="_blank">VER DETALLE</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Paginator data={{ metaData }} functions={{ pageQuery }} />
    </>
  );
};

export default FilteredSearch;
