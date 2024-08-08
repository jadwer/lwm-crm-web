const CatalogosTemplate = () => (

<main>
    <div className="container-fluid hero-sections mx-auto">
      <div className="container">
        <div className="row row align-items-center">
          <div className="col">
            <h1>CATÁLOGOS</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="container products-cards">
      <div className="row">
        <h2>Marcas</h2>
      </div>
      <div className="row row-cols-2 row-cols-md-4 g-4">
        <div className="col text-center">
          <div className="card mx-auto d-block">
          <img src="/../images/logos/apera-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <a href="/../catalogs/apr-cat-labor-wasser.pdf" download="apr-cat-labor-wasser.pdf" target="_blank">CONSULTAR</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
          <img src="/../images/logos/eisco-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <a href="/../catalogs/eisco-cat-labor-wasser.pdf" download="eisco-cat-labor-wasser.pdf" target="_blank">CONSULTAR</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
          <img src="/../images/logos/productos-quimicos-monterrey-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <a href="/../catalogs/fermon-cat-labor-wasser.pdf" download="fermon-cat-labor-wasser.pdf" target="_blank">CONSULTAR</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
          <img src="/../images/logos/hanna-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <a href="/../catalogs/hanna-cat-labor-wasser.pdf" download="hanna-cat-labor-wasser.pdf" target="_blank">CONSULTAR</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
          <img src="/../images/logos/high-purity-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <a href="/../catalogs/high-purity-labor-wasser.pdf" download="high-purity-labor-wasser.pdf" target="_blank">CONSULTAR</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
          <img src="/../images/logos/imparlab-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <a href="/../catalogs/imparlab-labor-wasser.pdf" download="imparlab-labor-wasser.pdf" target="_blank">CONSULTAR</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
          <img src="/../images/logos/micron-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <a href="/../catalogs/myron-labor-wasser.pdf" download="myron-labor-wasser.pdf" target="_blank">CONSULTAR</a>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid cta">
      <div className="row align-items-center">
        <div className="col-12 col-md-5 left">
        </div>
        <div className="col-12 col-md-7 text-center right">
          <h1>¿NECESITAS UNA COTIZACIÓN?</h1>
          <h6>Ponte en contacto con nosotros y uno de nuestros representantes se pondrán en contacto contigo.</h6>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#navMenu">
            Cotiza ahora
          </button>
        </div>
      </div>
    </div>
  </main>


); export default CatalogosTemplate;
