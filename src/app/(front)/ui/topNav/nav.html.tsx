import React from "react";

const TopNav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid toggle-head">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/productos/reactivos">Reactivos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/productos/medios-de-cultivo">Medios de cultivo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/productos/cristaleria">Cristalería</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/productos/analisis-de-agua">Analisis de agua</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/productos/proceso">Proceso</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Recursos
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="catalogos">Catálogos</a></li>
                <li><a className="dropdown-item" href="certificados">Certificados</a></li>
                <li><a className="dropdown-item" href="precios">Lista de precios</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/nosotros">Nosotros</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
