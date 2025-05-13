"use client";

import AddUpdateBrands from "./addUpdateBrands";
import { useBrands } from "@/hooks/erp/useBrands";
import { useState } from "react";
import { Brand } from "@/lib/interfaces";

const BrandsTemplate = (props: any) => {
  const marcas = props.data.marcas.data;
  const setStatus = props.data.setStatus;
  const status = props.data.status;

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const { remove } = useBrands();

  const submitDelBrand = (e: React.MouseEvent, brandId: number) => {
    e.preventDefault();
    if (
      confirm(
        "¿Estás seguro que quieres eliminar esta marca? Esta acción no se puede deshacer."
      )
    ) {
      remove(brandId)
        .then(() => setStatus("success"))
        .catch((error) => {
          console.error(error);
          setErrors({ general: ["No se pudo eliminar la marca."] });
        });
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
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newBrand">
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
                  <th scope="col">Nombre de la marca</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {marcas.map((marca: Brand) => (
                  <tr key={marca.id}>
                    <th scope="row">{marca.name}</th>
                    <td>{marca.description}</td>
                    <td>{marca.slug}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-action"
                        data-bs-toggle="modal"
                        data-bs-target={`#brand-${marca.id}`}>
                        Editar
                      </button>{" "}
                      |
                      <button
                        type="button"
                        className="btn-action"
                        onClick={(e) => submitDelBrand(e, marca.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {marcas.map((marca: Brand) => (
        <AddUpdateBrands
          key={marca.id}
          data={marca}
          brand_id={`brand-${marca.id}`}
          setStatus={setStatus}
          status={status}
        />
      ))}

      <AddUpdateBrands
        data={null}
        brand_id="newBrand"
        setStatus={setStatus}
        status={status}
      />
    </main>
  );
};

export default BrandsTemplate;
