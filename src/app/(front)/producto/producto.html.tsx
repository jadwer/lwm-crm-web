const ProductoTemplate = () => (

  <main>
    <div className="container-fluid hero-sections mx-auto">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>MÉTODO COLORIMÉTRICO</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="container product-detail mt-4">
      <div className="row align-items-center">
        <div className="col col-md-6 product-detail">
          <img src="/../images/labor-wasser-mexico-product-detail.webp" className="img-fluid"
            alt="Labor Wasser México" />
        </div>
        <div className="col col-md-6 text-detail">
          <div className="row align-items-center">
            <div className="col">
              <p><span className="labels">Marca:Merk | Categoría: Microbiología</span></p>
              <h5>Bactident® Oxidasa, para detección de /br la citocromo oxidasa en microorganismos. 50 tiras</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <p>ID: MK-1133000001</p>
              <p>Categoría: Microbiología</p>
              <p>Unidad de medida: Pieza</p>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-secondary mt-1">
                  <span>DESCARGAR FICHA TÉCNICA</span>
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
          <p className="text-justify">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </div>
      </div>
    </div>
  </main>


); export default ProductoTemplate;
