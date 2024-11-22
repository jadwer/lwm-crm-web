"use client";
import Paginator from "@/app/(crm)/ui/paginator/paginator";
import { useProducts } from "@/hooks/products";
import { Product, Products } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

const FilteredSearch = (props: any ) => {
  const searchFilter = props.data.searchFilter;
  const pageQuery = props.functions.pageQuery;

  const [productos, setProductos] = useState<Products>({} as Products);
  const [errors, setErrors] = useState<any[]>([]);
  const [status, setStatus] = useState<string>();

  const { getFilteredProducts } = useProducts();

  useEffect(() => {
    getFilteredProducts({setProductos}, searchFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  const { delProduct } = useProducts();

  const submitDelProduct = (
    e: { preventDefault: () => void },
    prod_id: number
  ) => {
    e.preventDefault();
    if (
      confirm(
        "¿Estás seguro que quieres eliminar este producto? Esta acción no se puede deshacer."
      )
    ) {
      delProduct({ setErrors, setStatus }, prod_id);
      props.functions.setPage("");
    }
  };


  if (Object.keys(productos).length === 0) {
    return <>Cargando...</>;
  } else {
    console.log(searchFilter);
//    console.log(productos.data);
    const metaData = productos
    return (
      <>
        <div className="row">
          <div className="col-12 mt-2 table-product">
            <table className="table">
              <thead>
                <tr>
                  <th className="tab-name" scope="col">
                    Nombre del producto
                  </th>
                  <th className="tab-category" scope="col">
                    Categoría
                  </th>
                  <th className="tab-brand" scope="col">
                    Marca
                  </th>
                  <th className="tab-actions" scope="col">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productos.data.map((producto: Product) => {
                  return (
                    <tr key={producto.id}>
                      <th scope="row">
                        <Link href={`/producto/${producto.id}`} rel="noopener noreferrer" target="_blank">
                          {producto.name}
                        </Link>
                      </th>
                      <td>{producto.category_id.name}</td>
                      <td>{producto.brand_id.name}</td>
                      <td>
                        <Link href={`/dashboard/edit-product/${producto.id}`}>
                        <i className="bi bi-pencil-square"></i>
                        </Link>{" "}
                        {" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            submitDelProduct(e, producto.id);
                          }}>
                          <i className="bi bi-trash"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Paginator
              data={{ metaData }} functions = {{pageQuery}}></Paginator>
          </div>
        </div>

      </>
    );
  }
};

export default FilteredSearch;
