const ProductoTemplate = (props: any) => {
  const producto = props.data.producto;
 
  return (
    <main>
      <div className="container-fluid hero-sections mx-auto">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>{producto.name}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container product-detail mt-4">
        <div className="row align-items-center">
          <div className="col col-md-6 product-detail">
            <img
              src={process.env.NEXT_PUBLIC_BACKEND_URL+'/storage/products/'+producto.img_path}
              className="img-fluid"
              alt="Labor Wasser México"
            />
          </div>
          <div className="col col-md-6 text-detail">
            <div className="row align-items-center">
              <div className="col">
                <p>
                  <span className="labels">
                    Marca: {producto.brand_id.name} | Categoría:{" "}
                    {producto.category_id.name}
                  </span>
                </p>
                <h5>{producto.name}</h5>
                <p>{producto.description}</p>
                <p>ID: {producto.sku}</p>
                <p>Categoría: {producto.category_id.name}</p>
                <p>Unidad de medida: {producto.unit_id.type}</p>
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-secondary mt-1">
                  <span><a
                      href={producto.datasheet_path}
                      download={producto.datasheet_path}
                      target="_blank">
                      DESCARGAR FICHA TÉCNICA
                    </a>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary mt-1"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#estimate">
                    <span>¡SOLICITA TU COTIZACIÓN AHORA!</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container product-more-info">
        <div className="row justify-content-center">
          <div className="col-10">
            <h4>Detalles del producto</h4>
            <p className="text-justify">{producto.full_description}</p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProductoTemplate;
