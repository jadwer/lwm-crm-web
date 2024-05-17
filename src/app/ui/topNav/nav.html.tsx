import React from "react";

const TopNav = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Reactivos
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Medios de cultivo
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Cristalería
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Análisis de agua
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Proceso
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-expanded="false">
          Recursos +
        </a>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="laboratorios">
              Laboratorios
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="productos">
              Productos
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="reactivos">
              Reactivos
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="producto">
              Detalle del producto
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="certificados">
              Certificados
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Salir
            </a>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" aria-disabled="true">
          Nosotros
        </a>
      </li>
    </ul>
  );
};

export default TopNav;
