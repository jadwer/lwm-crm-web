import Link from "next/link";
import Paginator from "../../ui/paginator/paginator";
import SelectCategories from "../../ui/dropdownItems/selectCategories";
import { useState } from "react";
import { Brand, Category } from "@/lib/interfaces";
import SelectBrands from "../../ui/dropdownItems/selectBrands";
import { useProducts } from "@/hooks/products";

const ProductsTemplate = (props: any) => {
  const productos = props.data.productos.data;
  const metaData = props.data.productos;
  const searchQueryBuilder = props.functions.searchQueryBuilder;

  const [categoria, setCategoria] = useState<Category>({} as Category);
  const [marca, setMarca] = useState<Brand>({} as Brand);
  const [errors, setErrors] = useState<any[]>([]);
  const [status, setStatus] = useState<string>();

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
    }
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
              stateData={{ categoria, setCategoria }}
              label="Filtro por categoría"
            />
          </div>
          <div className="col-12 col-md-3">
            <SelectBrands
              stateData={{ marca, setMarca }}
              label="Filtro por marca"
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto"
                aria-label="Buscar"
                aria-describedby="button-addon2"></input>
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2">
                Buscar
              </button>
            </div>
          </div>
        </div>
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
                {productos.map((producto: any) => {
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
              data={{ metaData }} functions = {{searchQueryBuilder}}></Paginator>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProductsTemplate;
