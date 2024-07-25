import AddUpdateBrands from "./addUpdateBrands";
import { useBrands } from "@/hooks/brands";
import { useState } from "react";

const BrandsTemplate = (props: any) => {
    
    const marcas = props.data.marcas.data;
    const setStatus = props.data.setStatus;
    const status = props.data.status;
  
    const [errors, setErrors] = useState([]);
  
    const { delBrand } = useBrands();
  
    const submitDelBrand = (
      e: { preventDefault: () => void },
      brand_id: number
    ) => {
      e.preventDefault();
      if (
        confirm(
          "¿Estás seguro que quieres eliminar esta marca? Esta acción no se puede deshacer."
        )
      ) {
        delBrand({ setErrors, setStatus }, brand_id);
      }
    };

    
    return (
    <main>
        <div className="container-fluid back-header">
            <div className="row my-4 align-items-md-center">
                <div className="col-12 col-md-6">
                    <h2>Marcas</h2>
                    <h4>Agregar Marca</h4>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newBrand">
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
                                <th className="tab-name" scope="col">Nombre de la marca</th>
                                <th className="tab-actions" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {marcas.map((marca: any) => {
                  return (
                    <tr key={marca.id}>
                      <td scope="row">{marca.name}</td>
                      <td>
                        {" "}
                        <button
                          type="button"
                          className="btn-action"
                          data-bs-toggle="modal"
                          data-bs-target={`#brand-${marca.id}`}>
                          Editar
                        </button>
                        |
                        <button
                          type="button"
                          className="btn-action"
                          onClick={(e) => {
                            submitDelBrand(e, marca.id);
                          }}>
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
        {marcas.map((marca: any) => {
        return (
          <AddUpdateBrands
            data={marca}
            brand_id={"brand-" + marca.id}
            status={{ setStatus, status }}
            key={marca.id}></AddUpdateBrands>
        );
      })}
      ;
      <AddUpdateBrands
        data={null}
        status={{ setStatus, status }}
        brand_id={"newBrand"}></AddUpdateBrands>

    </main>

)}; export default BrandsTemplate;