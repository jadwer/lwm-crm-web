import AddUpdateUnits from "./addUpdateUnits";
import { useUnits } from "@/hooks/units";
import { useState } from "react";

const UnitsTemplate = (props: any) => {
  const unidades = props.data.unidades.data;
  const setStatus = props.data.setStatus;
  const status = props.data.status;

  const [errors, setErrors] = useState([]);

  const { delUnit } = useUnits();

  const submitDelUnit = (
    e: { preventDefault: () => void },
    unit_id: number
  ) => {
    e.preventDefault();
    if (
      confirm(
        "¿Estás seguro que quieres eliminar esta unidad de medida? Esta acción no se puede deshacer."
      )
    ) {
      delUnit({ setErrors, setStatus }, unit_id);
    }
  };
  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Unidades</h2>
            <h4>Agregar unidad de medida</h4>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newUnit">
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
                    Nombre de la unidad de medida
                  </th>
                  <th className="tab-name" scope="col">
                    Descripción
                  </th>
                  <th className="tab-brand" scope="col">
                    Código de unidad de medida
                  </th>
                  <th className="tab-actions" scope="col">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {unidades.map((unidad: any) => {
                  return (
                    <tr key={unidad.id}>
                      <td scope="row">{unidad.name}</td>
                      <td scope="row">{unidad.type}</td>
                      <td scope="row">{unidad.code}</td>
                      <td>
                        {" "}
                        <button
                          type="button"
                          className="btn-action"
                          data-bs-toggle="modal"
                          data-bs-target={`#unit-${unidad.id}`}>
                          Editar
                        </button>
                        |
                        <button
                          type="button"
                          className="btn-action"
                          onClick={(e) => {
                            submitDelUnit(e, unidad.id);
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
      {unidades.map((unidad: any) => {
        return (
          <AddUpdateUnits
            data={unidad}
            unit_id={"unit-" + unidad.id}
            status={{ setStatus, status }}
            key={unidad.id}></AddUpdateUnits>
        );
      })}
      ;
      <AddUpdateUnits
        data={null}
        status={{ setStatus, status }}
        unit_id={"newUnit"}></AddUpdateUnits>
    </main>
  );
};
export default UnitsTemplate;
