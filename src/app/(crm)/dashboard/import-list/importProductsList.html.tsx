'use client'
import { useProducts } from "@/hooks/products";
import { MouseEvent, useEffect, useState } from "react";

const ImportProductsListTemplate = (props: any) => {
  const [selectedList, setSelectedList] = useState<File>()
  const [errors, setErrors] = useState<any[]>([]);
  const [status, setStatus] = useState<string>();

  const { CSVImport } = useProducts()

  useEffect(()=>{},[status]);
  
  const submitList = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let dataForm = {
      selectedList: selectedList,
    };

    await CSVImport({ setErrors, setStatus }, dataForm);
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    submitList(e);
  };

  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Productos</h2>
            <h4>Agregar nuevo producto</h4>
          </div>
        </div>
      </div>
      <div className="container-fluid container-product">
        <form className="row g-3">
          <div className="col-12 col-md-4">
            <div id="imageContainer">Imagen del producto</div>
            <input
              type="file"
              id="fileInput"
              accept="pdf/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setSelectedList(file ? file : undefined);
              }}
            />
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={(e) => {
                handleSubmit(e);
              }}>
              Importar
            </button>
          </div>
        </form>
        {status && (status === "success") ? (<div>Lista importada con éxito.</div>): null}
      </div>
    </main>
  );
};
export default ImportProductsListTemplate;
