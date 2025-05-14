const SideNav = () => (
  <div className="sidebar">
    <img
      className="img-fluid mt-3 mb-3"
      alt=""
      src="/../images/labor-wasser-mexico-logo-3.png"
    />

    <div className="sidebar">
      <a href="/dashboard">
        <span className="fs-5 fw-semibold">Dashboard</span>
      </a>

      <ul className="flex-column w-25 mw-25 list-unstyled">

        <li className="mb-1">
          <button
            className="btn btn-toggle collapsed"
            style={{ color: "#fff" }}
            data-bs-toggle="collapse"
            data-bs-target="#inventory-collapse"
            aria-expanded="false">
            Productos
          </button>
          <div className="collapse" id="inventory-collapse">
            <ul className="btn-toggle-nav list-unstyled small">
              <li>
                <a
                  href="/dashboard/products">
                  Todos los productos
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/products/add">
                  Nuevo producto
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle collapsed"
            style={{ color: "#fff" }} >
            <a href="/dashboard/categories">Categorías</a>
          </button>
          </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle collapsed"
            style={{ color: "#fff" }} >
            <a href="/dashboard/brands">Marcas</a>
          </button>
          </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle collapsed"
            style={{ color: "#fff" }} >
            <a href="/dashboard/units">Unidades</a>
          </button>
          </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle collapsed"
            style={{ color: "#fff" }} >
            <a href="/dashboard/inventory">Inventario</a>
          </button>
          </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle collapsed"
            style={{ color: "#fff" }}
            data-bs-toggle="collapse"
            data-bs-target="#warehouses-collapse"
            aria-expanded="false">
            Almacenes
          </button>
          <div className="collapse" id="warehouses-collapse">
            <ul className="btn-toggle-nav list-unstyled small">
              <li>
                <a
                  href="/dashboard/warehouses">
                  Almacenes
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/warehouses/locations">
                  Ubicaciones
                </a>
              </li>
            </ul>
          </div>
        </li>


        <li className="mb-1">
          <button
            className="btn btn-toggle collapsed"
            style={{ color: "#fff" }} >
            <a href="/dashboard/suppliers">Proveedores</a>
          </button>
          </li>

      </ul>

    </div>
  </div>
);
export default SideNav;
