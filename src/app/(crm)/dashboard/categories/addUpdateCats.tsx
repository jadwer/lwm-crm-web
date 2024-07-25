import { useCategories } from "@/hooks/categories";
import { Category } from "@/lib/interfaces";
import { redirect } from "next/navigation";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const AddUpdateCategory = (
  props:
    | {
        data: Category | null;
        cat_id: string;
      }
    | any
) => {
  const cat_id = props.cat_id;
  const category = props.data == null ? ({} as Category) : props.data;

  const [nombre, setNombre] = useState(category.name);
  const [descripcion, setDescripcion] = useState(category.description);
  const [slug, setSlug] = useState(category.slug);
  const [errors, setErrors] = useState([]);
  const setStatus = props.status.setStatus;
  const status = props.status.status;

  const { setCategory } = useCategories();

  const submitNewCategory = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    let dataForm = {
      id: category.id,
      name: nombre,
      description: descripcion,
      slug: slug,
    };

    await setCategory({ setErrors, setStatus }, dataForm);
  };
  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    submitNewCategory(e);
  };

  return (
    <div
      className="modal fade"
      id={cat_id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      /*tabindex="-1" */ aria-labelledby={"Label-" + cat_id}
      aria-hidden="true">
      <div className="modal-dialog">
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={"Label-" + cat_id}>
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
                  id={"name-" + cat_id}
                  placeholder="Nombre de la categoría"
                  value={nombre}
                  onChange={(event) => {
                    setNombre(event.target.value);
                  }}></input>
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id={"descript-" + cat_id}
                  placeholder="Nombre de la categoría"
                  value={descripcion}
                  onChange={(event) => {
                    setDescripcion(event.target.value);
                  }}></input>
                <label className="form-label">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  id={"slug-" + cat_id}
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
export default AddUpdateCategory;
