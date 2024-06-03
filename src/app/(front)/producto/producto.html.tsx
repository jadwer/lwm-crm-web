const ProductoTemplate = () => (

<main>
    <div className="container py-4 px-3 mx-auto">
      <h1>Producto</h1>
      <div className="col-lg-8 px-0">
        <p className="fs-4">
          Detalle del producto
        </p>
      </div>
      
      <button
        type="button"
        className="btn btn-primary me-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#estimate">
        <span>Cotizar</span>
      </button>

    </div>
  </main>


); export default ProductoTemplate;
