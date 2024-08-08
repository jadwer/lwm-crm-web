import { useBrands } from "@/hooks/brands";
import { Brand } from "@/lib/interfaces";
import { redirect } from "next/navigation";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const AddUpdateBrands = (
  props:
    | {
        data: Brand | null;
        brand_id: string;
      }
    | any
) => {
  const brand_id = props.brand_id;
  const brand = props.data == null ? ({} as Brand) : props.data;

  const [nombre, setNombre] = useState(brand.name);
  const [descripcion, setDescripcion] = useState(brand.description);
  const [slug, setSlug] = useState(brand.slug);
  const [errors, setErrors] = useState([]);
  const setStatus = props.status.setStatus;
  const status = props.status.status;

  const { setBrand } = useBrands();

  const submitNewBrend = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let dataForm = {
      id: brand.id,
      name: nombre,
      description: descripcion,
      slug: slug,
    };

    await setBrand({ setErrors, setStatus }, dataForm);
  };
  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    submitNewBrend(e);
  };

  return (
    <div
      className="modal fade"
      id={brand_id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      /*tabindex="-1" */ aria-labelledby={"Label-" + brand_id}
      aria-hidden="true">
      <div className="modal-dialog">
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={"Label-" + brand_id}>
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
                <label className="form-label">Marca</label>
                <input
                  type="text"
                  className="form-control"
                  id={"name-" + brand_id}
                  placeholder="Nombre de la empresa"
                  value={nombre}
                  onChange={(event) => {
                    setNombre(event.target.value);
                  }}></input>
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id={"type-" + brand_id}
                  placeholder="Descripción de la empresa"
                  value={descripcion}
                  onChange={(event) => {
                    setDescripcion(event.target.value);
                  }}></input>
                <label className="form-label">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  id={"slug-" + brand_id}
                  placeholder="Nombre de la categoría"
                  value={slug}
                  onChange={(event) => {
                    setSlug(event.target.value);
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
export default AddUpdateBrands;
