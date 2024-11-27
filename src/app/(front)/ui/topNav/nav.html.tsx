const TopNav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-top">
      <div className="container toggle-head">
        <div className="col-12">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="bi bi-list"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/productos/todos">
                  Todos los productos
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/productos/reactivos">
                  Reactivos
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/productos/medios-de-cultivo">
                  Medios de cultivo
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/productos/cristaleria">
                  Cristalería
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/productos/analisis-de-agua">
                  Analisis de agua
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/productos/proceso">
                  Proceso
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/nosotros">
                    Nosotros
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Recursos
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="catalogos">
                      Catálogos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="certificados">
                      Certificados
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="precios">
                      Lista de precios
                    </a>
                  </li>
                </ul>
              </li>
              
            </ul>
          </div>
        </div>
        {/* <div className="col-12 col-md-4 d-flex">
          <div className="input-group my-1">
            <form id="homeSearch" method="get" action="/productos/todos">
              <input
                type="text"
                id="searchNavProduct"
                className="col-md-10 form-control"
                placeholder="Introduzca el nombre del producto"
                name="homeSearch"
              />
              <button
                className="btn btn-primary"
                type="submit"
                id="button-addon1">
                Buscar
              </button>
            </form>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default TopNav;
