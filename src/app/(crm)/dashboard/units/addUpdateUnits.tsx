import { useUnits } from "@/hooks/units";
import { Unit } from "@/lib/interfaces";
import { redirect } from "next/navigation";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const AddUpdateUnits = (
  props:
    | {
        data: Unit | null;
        unit_id: string;
      }
    | any
) => {
  const unit_id = props.unit_id;
  const unit = props.data == null ? ({} as Unit) : props.data;

  const [nombre, setNombre] = useState(unit.name);
  const [tipo, setTipo] = useState(unit.type);
  const [code, setCode] = useState(unit.code);
  const [errors, setErrors] = useState([]);
  const setStatus = props.status.setStatus;
  const status = props.status.status;

  const { setUnit } = useUnits();

  const submitNewUnit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let dataForm = {
      id: unit.id,
      name: nombre,
      type: tipo,
      code: code,
    };

    await setUnit({ setErrors, setStatus }, dataForm);
  };
  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    submitNewUnit(e);
  };

  return (
    <div
      className="modal fade"
      id={unit_id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      /*tabindex="-1" */ aria-labelledby={"Label-" + unit_id}
      aria-hidden="true">
      <div className="modal-dialog">
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={"Label-" + unit_id}>
                Agregar / Editar
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id={"name-" + unit_id}
                  placeholder="Nombre de la unidad de medida"
                  value={nombre}
                  onChange={(event) => {
                    setNombre(event.target.value);
                  }}></input>
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id={"type-" + unit_id}
                  placeholder="descripción de la medida"
                  value={tipo}
                  onChange={(event) => {
                    setTipo(event.target.value);
                  }}></input>
                <label className="form-label">Código</label>
                <input
                  type="text"
                  className="form-control"
                  id={"code-" + unit_id}
                  placeholder="Código del tipo de unidad de medida"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                  }}></input>
              </div>
            </div>
            <div className="modal-footer">
              {status !== "" ? (
                <div className="modal-message">
                  Los cambios se han realizado. ¡Ya puedes cerrar esta ventana!
                </div>
              ) : null}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => {
                  handleSubmit(event);
                }}>
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddUpdateUnits;
