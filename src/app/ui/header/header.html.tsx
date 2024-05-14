import { Image } from "react-bootstrap";

const HeaderTemplate = () => { return (

<header>
    <div className="d-flex justify-content-around align-items-md-center pb-3 border-bottom">
      <h1 className="h4">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none">
          <img alt="" src="#" />
          <span>Labor Wasser Mexico </span>
        </a>
      </h1>
      <div>contacto</div>

      <button
        type="button"
        className="btn btn-primary me-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#navMenu">
        <i className="bi bi-list"></i>
      </button>
    </div>
  </header>


)}; export default HeaderTemplate