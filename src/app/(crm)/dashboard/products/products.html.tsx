import Link from "next/link";
import Paginator from "../../ui/paginator/paginator";

const ProductsTemplate = (props: any) => {
  const productos = props.data.productos.data;
  const metaData = props.data.productos;

  const links = metaData.links
  const first = metaData.first_page_url
  const first_url = metaData.prev_page_url
  const last = metaData.last_page_url
  const last_url = metaData.next_page_url

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Categorías</h2>
            <h4>Todos los productos</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <button type="button" className="btn btn-primary">
              Importar lista
            </button>
            <Link href={"/dashboard/add-product"} className="btn btn-primary ms-2">
              Agregar producto 
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid container-product">
        <div className="row back-header-2">
          <div className="col-12 col-md-3">
            <select className="form-select" aria-label="Filtro categoría">
              <option defaultValue={""}>Filtro por categoría</option>
              <option value="1">Reactivos</option>
              <option value="2">Medios de cultivo</option>
              <option value="3">Cristalería</option>
              <option value="3">Analisis de agua</option>
              <option value="3">Procesos</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <select className="form-select" aria-label="Filtro categoría">
              <option defaultValue={""}>Filtro por marca</option>
              <option value="1">Apera</option>
              <option value="2">Avantor</option>
              <option value="3">Brand</option>
              <option value="3">BD</option>
              <option value="3">Biometrux</option>
            </select>
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
                      <th scope="row">{producto.name}</th>
                      <td>{producto.category_id.name}</td>
                      <td>{producto.brand_id.name}</td>
                      <td>Editar | Eliminar</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Paginator data={{links, first, last, first_url, last_url}}></Paginator>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProductsTemplate;
