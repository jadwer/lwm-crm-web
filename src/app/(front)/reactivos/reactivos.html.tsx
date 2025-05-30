'use client'
import { useState } from "react";
import FilteredSearch from "../ui/search/fiteredSearch";
import Recommended from "../ui/widgets/recomended";

const ReactivosTemplate = () => {
  const [items, setItems] = useState<number>(5);
  const [category, setCategory] = useState<number>(1);
  const [brand, setBrand] = useState(1);
  const [searchString, setSearchString] = useState<string>("");

  return (
    <main>
      <div className="container-fluid hero-sections mx-auto">
      <div className="container">
        <div className="row row align-items-center">
          <div className="col">
            <h1>REACTIVOS</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid products-page">
      <div className="row">
        <div className="col-12 col-md-2">
          <h5>MARCAS 222</h5>
          <div className="form-check">
            <input
              id="marca1"
              type="checkbox"
              className="form-check-input"
            />
            <label htmlFor="marca1" className="form-check-label">J. T. Baker</label>
          </div>
          <div className="form-check">
            <input
              id="marca2"
              type="checkbox"
              className="form-check-input"
            />
            <label htmlFor="marca2" className="form-check-label">Merk</label>
          </div>
          <div className="form-check">
            <input
              id="marca3"
              type="checkbox"
              className="form-check-input"
            />
            <label htmlFor="marca3" className="form-check-label">Meyer</label>
          </div>
          <div className="form-check">
            <input
              id="marca4"
              type="checkbox"
              className="form-check-input"
            />
            <label htmlFor="marca4" className="form-check-label">High Purity</label>
          </div>
          <div className="form-check">
            <input
              id="marca5"
              type="checkbox"
              className="form-check-input"
            />
            <label htmlFor="marca5" className="form-check-label">J. T. Baker</label>
          </div>
          <button type="button" className="btn btn-primary mt-4">Filtrar</button>
        </div>
        <div className="col-12 col-md-10">
          <div className="row mb-4">
            <div className="col mb-4">AQUÍ VAN LOS FILTROS</div>
          </div>

        <Recommended></Recommended>
          <div className="row mb-4">
            <div className="col mb-4">AQUÍ VAN LOS FILTROS</div>
          </div>
        </div>
      </div>
    </div>

    <div className="container-fluid cta">
      <div className="row align-items-center">
        <div className="col-12 col-md-5 left">
        </div>
        <div className="col-12 col-md-7 text-center right">
          <h1>¿NECESITAS UNA COTIZACIÓN?</h1>
          <h6>Ponte en contacto con nosotros y uno de nuestros representantes se pondrán en contacto contigo.</h6>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#navMenu">
            Cotiza ahora
          </button>
        </div>
      </div>
    </div>
  </main>

  );

}; export default ReactivosTemplate;
