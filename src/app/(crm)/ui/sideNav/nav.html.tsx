const SideNav = () => (

    <ul className="nav flex-column w-25 mw-25">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/dashboard">
          Productos
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Categorías
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Marcas
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Usuarios
        </a>
      </li>
    </ul>
); export default SideNav;
