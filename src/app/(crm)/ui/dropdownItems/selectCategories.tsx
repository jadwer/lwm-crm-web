"use client";

import { useCategories } from "@/hooks/categories";
import { Categories, Category } from "@/lib/interfaces";
import { useEffect, useState } from "react";

const SelectCategories = (props: any) => {
  const label = props.label;
  const { getCategories } = useCategories();
  const [categories, setCategories] = useState<Categories>({} as Categories);

  useEffect(() => {
    getCategories({ setCategories });
  }, []);

  if (Object.keys(categories).length === 0) {
    return <>Cargando...</>;
  } else {
    return (
        <select
          id="categoria"
          className="form-select"
          value={props.stateData.categoria}
          onChange={(e) => {
            props.stateData.setCategoria(e.target.value);
          }}>
          <option defaultValue={""}>{label}</option>
          {categories.data.map((categoria: Category) => {
            return (
              <option value={categoria.id} key={categoria.id}>
                {categoria.name}
              </option>
            );
          })}
        </select>
    );
  }
};
export default SelectCategories;
