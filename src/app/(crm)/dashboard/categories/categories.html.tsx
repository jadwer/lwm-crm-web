import Link from "next/link";
import AddUpdateCategory from "./addUpdate";
import { useProducts } from "@/hooks/products";
import { useState } from "react";

const CategoriesTemplate = (props: any) => {
  const categorias = props.data.categorias.data;
  const setStatus = props.data.setStatus;
  const status = props.data.status

  const [errors, setErrors] = useState([]);

  const {delCategory} = useProducts();

  const submitDelCategory = (e: { preventDefault: () => void; }, cat_id : number) => {
    e.preventDefault();
    if(confirm("¿Estás seguro que quieres eliminar esta categoría? Esta acción no se puede deshacer.")){delCategory({setErrors, setStatus}, cat_id);}
  }
  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Categorías</h2>
            <h4>Agregar Categoría</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newCat">
              Agregar
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid container-product">
        <div className="row">
          <div className="col-12 mt-2 table-product">
            <table className="table">
              <thead>
                <tr>
                  <th className="tab-category" scope="col">
                    Nombre de la categoría
                  </th>
                  <th className="tab-name" scope="col">
                    Descripción
                  </th>
                  <th className="tab-brand" scope="col">
                    Slug
                  </th>
                  <th className="tab-actions" scope="col">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria: any) => {
                  return (
                    <tr key={categoria.id}>
                      <td scope="row">{categoria.name}</td>
                      <td scope="row">{categoria.description}</td>
                      <td scope="row">{categoria.slug}</td>
                      <td>
                        {" "}
                        <button
                          type="button"
                          className="btn-action"
                          data-bs-toggle="modal"
                          data-bs-target={`#cat-${categoria.id}`}>
                          Editar
                        </button>
                        |
                        <button type="button" className="btn-action" onClick={(e) =>{submitDelCategory(e, categoria.id)}}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {categorias.map((categoria: any) => {
          return (
              <AddUpdateCategory data={categoria} cat_id={"cat-"+categoria.id} status={{setStatus, status}} key={categoria.id}></AddUpdateCategory>
            )
        })
    };
    <AddUpdateCategory data={null}  status={{setStatus, status}} cat_id={"newCat"}></AddUpdateCategory>
    </main>
  );
};
export default CategoriesTemplate;
