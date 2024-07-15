const HomePage = () => (

  <main>
    <div className="container-fluid hero-1 mx-auto">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 hero-left">
          <h1>MEJORAMOS EL MUNDO DE TU LABORATORIO</h1>
          <h5 className="highlight-hero">Encuentra los mejores productos, marcas reconocidas y la mejor atención para tu laboratorio</h5>
          <div className="col d-flex mt-4">
            <button type="button" className="btn btn-primary">¡Cotiza ahora!</button>
            <button type="button" className="btn btn-secondary mx-4">Ver productos</button>
          </div>
        </div>
        <div className="col-12 col-md-6 hero-right"></div>
      </div>
    </div>
    {/* <div className="container numbers text-center">
      <div className="row">
        <div className="col-12 col-md-4">Numero 1</div>
        <div className="col-12 col-md-4">Numero 2</div>
        <div className="col-12 col-md-4">Numero 3</div>
      </div>
    </div> */}
    <div className="container-fluid about">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 left-info">
          <h4>¿Por qué comprar con nosotros?</h4>
          <p>Por la calidad en nuestro servicio, por la experiencia técnica y la resolución de la problemática tanto en la parte analítica como en la parte de proceso, además de que somos una empresa innovadora con tecnología de vanguardia, trabajamos a través de un CRM y un ERP para un mejor servicio, así como la concentración de las mejores marcas para la parte analítica y de proceso para la industria y la investigación, especialistas en químicos y tratamientos en aguas.</p>
          <div className="col d-flex mt-4">
            {/* <button type="button" className="btn btn-primary">¡Cotiza ahora!</button> */}
            <button type="button" className="btn btn-secondary mx-4">Más sobre nosotros</button>
          </div>
        </div>
        <div className="col-12 col-md-6 hero-2">
        </div>
      </div>
    </div>
    <div className="container products">
      <div className="row">
        <div className="col text-center">
          <h1>PRODUCTOS RECOMENDADOS</h1>
          <hr className="separator"></hr>
        </div>
      </div>
      <div className="row products-list">
        <div className="col-12">
          <p><span className="labels">Marca:Merk | Categoría: Microbiología</span></p>
          <h6>Bactident® Oxidasa, para detección de /br la citocromo oxidasa en microorganismos. 50 tiras</h6>
          <a href="producto">VER DETALLE</a>
        </div>
        <hr></hr>
        <div className="col-12">
          <p><span className="labels">Marca:Merk | Categoría: Microbiología</span></p>
          <h6>Bactident® Oxidasa, para detección de /br la citocromo oxidasa en microorganismos. 50 tiras</h6>
          <a href="producto">VER DETALLE</a>
        </div>
        <hr></hr>
        <div className="col-12">
          <p><span className="labels">Marca:Merk | Categoría: Microbiología</span></p>
          <h6>Bactident® Oxidasa, para detección de /br la citocromo oxidasa en microorganismos. 50 tiras</h6>
          <a href="producto">VER DETALLE</a>
        </div>
        <hr></hr>
        <div className="col-12">
          <p><span className="labels">Marca:Merk | Categoría: Microbiología</span></p>
          <h6>Bactident® Oxidasa, para detección de /br la citocromo oxidasa en microorganismos. 50 tiras</h6>
          <a href="producto">VER DETALLE</a>
        </div>
        <hr></hr>
        <div className="col-12 text-center btn-space">
          <a className="btn btn-primary" href="productos" role="button">Ver todos los productos</a>
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
    <div className="container clients">
      <div className="row">
        <div className="col text-center">
          <h1>NUESTRAS MARCAS</h1>
          <hr className="separator"></hr>
        </div>
      </div>
      <div className="row row-cols-2 row-cols-md-5 g-xs-2 g-md-4">
        <div className="col">
          <div className="card">
            <img src="/../images/logos/apera-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/avantor-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/band-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/bd-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/biomerieux-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/condalab-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/dibico-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/dwk-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/eisco-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/fisher.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/hach-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/hanna-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/high-purity-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/honeywell-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/imparlab-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/jt-baker-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/merck-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/microbiologics-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/microflex-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/micron-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/productos-quimicos-monterrey-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/thermo-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/toronto-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/usp-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/vwr-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/whatman-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src="/../images/logos/whirl-labor-wasser.webp" className="card-img-top"
              alt="Labor Wasser México" />
          </div>
        </div>
      </div>
    </div>
  </main>

); export default HomePage;
