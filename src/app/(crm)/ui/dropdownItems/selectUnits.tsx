"use client";

import { useUnits } from "@/hooks/units";
import { Units, Unit } from "@/lib/interfaces";
import { useEffect, useState } from "react";

const SelectUnits = (props: any) => {
  const { getUnits } = useUnits();
  const [units, setUnits] = useState<Units>({} as Units);

  useEffect(() => {
    getUnits({ setUnits });
  }, []);

  if (Object.keys(units).length === 0) {
    return <>Cargando...</>;
  } else {
    return (
      <>
        <label className="form-label">Unidad de medida del producto</label>
        <select id="unidad" className="form-select">
          <option defaultValue="">Selecciona una opción</option>
        {units.data.map((unidad: Unit) => { return(
          <option value={unidad.id} key={unidad.id}>{unidad.name}</option>
        )})}
        </select>
      </>
    );
  }
};
export default SelectUnits;
