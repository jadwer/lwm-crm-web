"use client";

import { useCategories } from "@/hooks/categories";
import { Categories, Category } from "@/lib/interfaces";
import { useEffect, useState } from "react";

const SelectCategories = (props: any) => {
  const { getCategories } = useCategories();
  const [categories, setCategories] = useState<Categories>({} as Categories);

  useEffect(() => {
    getCategories({ setCategories });
  }, []);

  if (Object.keys(categories).length === 0) {
    return <>Cargando...</>;
  } else {
    return (
      <>
        <label className="form-label">Categoría del producto</label>
        <select id="categoria" className="form-select"
                  value={props.stateData.categoria}
                  onChange={(e) => {
                    props.stateData.setCategoria(e.target.value);
                  }}
        
        >
          <option defaultValue="">Selecciona una opción</option>
        {categories.data.map((categoria: Category) => { return(
          <option value={categoria.id} key={categoria.id}>{categoria.name}</option>
        )})}
        </select>
      </>
    );
  }
};
export default SelectCategories;
