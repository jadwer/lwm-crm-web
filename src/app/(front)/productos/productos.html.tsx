const ProductosTemplate = () => (

  <main>
    <div className="container-fluid hero-sections mx-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <h1>PRODUCTOS</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="container products-cards">
      <div className="row row-cols-2 row-cols-md-3 g-4">
        <div className="col text-center">
          <div className="card mx-auto d-block">
            <img src="/../images/iconos/labor-wasser-mexico-reactivos.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <h3>Reactivos</h3>
            <a href="reactivos">VER PRODUCTOS</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
            <img src="/../images/iconos/labor-wasser-mexico-cultivo.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <h3>Medios de cultivo</h3>
            <a href="reactivos">VER PRODUCTOS</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
            <img src="/../images/iconos/labor-wasser-mexico-cristalería.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <h3>Cristalería</h3>
            <a href="reactivos">Cristalería</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
            <img src="/../images/iconos/labor-wasser-mexico-agua.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <h3>Analisis de agua</h3>
            <a href="reactivos">VER PRODUCTOS</a>
          </div>
        </div>
        <div className="col text-center">
          <div className="card mx-auto d-block">
            <img src="/../images/iconos/labor-wasser-mexico-procesos.webp" className="card-img-top"
              alt="Labor Wasser México" />
            <h3>Procesos</h3>
            <a href="reactivos">VER PRODUCTOS</a>
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
          <button type="button" className="btn btn-primary">Cotiza ahora</button>
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
          <button type="button" className="btn btn-primary">Cotiza ahora</button>
        </div>
      </div>
    </div>
  </main>


); export default ProductosTemplate;
