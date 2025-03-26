import Estimate from "../../ui/estimate/estimate.html";

const ProductoTemplate = (props: any) => {
  const producto = props.data.producto;
  const name = producto.name;
  const showDl = producto.datasheet_path
    ? producto.datasheet_path !== ".pdf"
      ? true
      : false
    : false;

  const showPrice = producto.price
    ? producto.price !== "0.00"
      ? true
      : false
    : false;

  const download = () => {
    if (showDl) {
      return (
        <a
          href={
            process.env.NEXT_PUBLIC_BACKEND_URL +
            `/storage/datasheets/${producto.datasheet_path}`
          }
          download={
            process.env.NEXT_PUBLIC_BACKEND_URL +
            `/storage/datasheets/${producto.datasheet_path}`
          }
          target="_blank">
          <button type="button" className="btn btn-secondary my-2">
            <span>DESCARGAR FICHA TÉCNICA</span>
          </button>
        </a>
      );
    }
  };

  let CurrencyFormat = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
});

  const price = () => {
    if (showPrice) {
      return (
        <p>
          Precio: 
          <strong>{producto.price ? " MXN " + CurrencyFormat.format(parseFloat(producto.price)) : "0.00"}</strong>
          {producto.price && producto.iva ? " IVA incluído " : " + IVA "}
          
        </p>
      );
    }
  };
    console.log(producto);
  return (
    <main>
      <div className="container-fluid hero-sections mx-auto">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1>{producto.name}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container product-detail mt-4">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 product-detail">
            <img
              src={
                process.env.NEXT_PUBLIC_BACKEND_URL +
                "/storage/products/" +
                producto.img_path
              }
              className="img-fluid"
              alt="Labor Wasser México"
            />
          </div>
          <div className="col-12 col-md-6 text-detail">
            <div className="row align-items-center">
              <div className="col-12 pruduct-box">
                <p>
                  <span className="labels">
                    Marca: {producto.brand_id.name} | Categoría:{" "}
                    {producto.category_id.name}
                  </span>
                </p>
                <h5>{producto.name}</h5>
                {price()}
                <p>{producto.description}</p>
                <p>ID: {producto.sku}</p>
                <p>Categoría: {producto.category_id.name}</p>
                <p>Unidad de medida: {producto.unit_id.type}</p>
                <div className="col-12 col-md-8">{download()}</div>
                <div className="col-12 col-md-8">
                  <button
                    type="button"
                    className="btn btn-primary my-2"
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

      <Estimate producto={producto}></Estimate>
    </main>
  );
};
export default ProductoTemplate;
