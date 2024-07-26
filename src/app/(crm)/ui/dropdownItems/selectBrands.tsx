"use client";

import { useBrands } from "@/hooks/brands";
import { Brands, Brand } from "@/lib/interfaces";
import { useEffect, useState } from "react";

const SelectBrands = (props: any) => {
  const { getBrands } = useBrands();
  const [brands, setBrands] = useState<Brands>({} as Brands);

  useEffect(() => {
    getBrands({ setBrands });
  }, []);

  if (Object.keys(brands).length === 0) {
    return <>Cargando...</>;
  } else {
    return (
      <>
        <label className="form-label">Marca del producto</label>
        <select
          id="marca"
          className="form-select"
          value={props.stateData.marca}
          onChange={(e) => {
            props.stateData.setMarca(e.target.value);
          }}
          >
          <option defaultValue="">Selecciona una opción</option>
          {brands.data.map((marca: Brand) => {
            return (
              <option value={marca.id} key={marca.id}>
                {marca.name}
              </option>
            );
          })}
        </select>
      </>
    );
  }
};
export default SelectBrands;
