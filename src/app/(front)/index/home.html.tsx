import { Image } from "react-bootstrap";<div className="container py-3"></div>
import Recommended from "../ui/widgets/recomended";

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
    <div className="container-fluid offers">
      <div className="row">
        <div className="col text-center">
          <h1>OFERTAS DEL MES</h1>
          <hr className="separator"></hr>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 text-center card-offer blue-1 d-block mx-auto">
        <img src="/../images/labor-wasser-guantes-nitrilo.webp" className="img-fluid" alt="Labor Wasser México" />
          <p>Guantes de nitrilo azul sin polvo Supreno, tallas chica, mediana y grande. Paquete c/100 piezas marca MICROFLEX</p>
          <p>Modelo: SU-690</p>
          <h4>$15USD+IVA</h4>
          <a className="btn btn-primary mt-3" href="https://wa.link/a9t3qb" role="button" target="_blank">
              Pídelo ahora
            </a>
        </div>
        <div className="col-12 col-md-4 text-center card-offer blue-2">
        <img src="/../images/labor-wasser-mexico-viales-digestion-dqo.webp" className="img-fluid" alt="Labor Wasser México" />
        <p>Viales de digestión para demanda química de oxígeno (DQO), rango alto (20 -1500 mg/L), paquete de 150 HACH</p>
          <p>Modelo: 2125915</p>
          <h4>$532.7USD+IVA</h4>
          <a className="btn btn-primary mt-3" href="https://wa.link/a9t3qb" role="button" target="_blank">
              Pídelo ahora
            </a>
        </div>
        <div className="col-12 col-md-4 text-center card-offer blue-1">
        <img src="/../images/labor-wasser-kit-frascos-tampon.webp" className="img-fluid" alt="Labor Wasser México" />
          <p>KIT Frascos de tampón de pH 4.01, 7, 10.01 (475 ml) Orion trazabilidad conforme a la NIST</p>
 
          <p>Incluye modelos: 910104, 910107, 910110</p>
          <h4>$75USD+IVA</h4>
          <a className="btn btn-primary mt-3" href="https://wa.link/a9t3qb" role="button" target="_blank">
              Pídelo ahora
            </a>
        </div>
      </div>
      <div className="row"></div>
    </div>
    <div className="container numbers text-center d-none">
      <div className="row">
        <div className="col-12 col-md-3 text-center">
          <h1>+180,000</h1>
          <h5>PRODUCTOS</h5>
        </div>
        <div className="col-12 col-md-3 text-center">
          <h1>+2,000</h1>
          <h5>CLIENTES SATISFECHOS</h5>
        </div>
        <div className="col-12 col-md-3 text-center">
          <h1>27</h1>
          <h5>MARCAS</h5>
        </div>
        <div className="col-12 col-md-3 text-center">
          <h1>+1,000</h1>
          <h5>COTIZACIONES REALIZADAS</h5>
        </div>
      </div>
    </div>
    <div className="container-fluid about">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 left-info animate__animated animate__fadeInLeft animate__delay-1s">
          <h4 className="text-center text-md-start">
            ¿Por qué comprar con nosotros?
          </h4>
          <p className="text-center text-md-start">
            Por la calidad en nuestro servicio, por la experiencia técnica y la
            resolución de la problemática tanto en la parte analítica como en la
            parte de proceso, además de que somos una empresa innovadora con
            tecnología de vanguardia, trabajamos a través de un CRM y un ERP
            para un mejor servicio, así como la concentración de las mejores
            marcas para la parte analítica y de proceso para la industria y la
            investigación, especialistas en químicos y tratamientos en aguas.
          </p>
          <div className="col d-block d-md-flex mt-4">
            <a href="/nosotros">
              <button type="button" className="btn btn-secondary mx-0">
                Más sobre nosotros
              </button>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6 hero-2"></div>
      </div>
    </div>
    <Recommended />
    <div className="container-fluid cta">
      <div className="row align-items-center">
        <div className="col-12 col-md-5 left"></div>
        <div className="col-12 col-md-7 text-center right">
          <h1 className="animate__animated animate__bounceInDown animate__delay-1s">¿NECESITAS UNA COTIZACIÓN?</h1>
          <h6 className="animate__animated animate__bounceInDown animate__delay-1.5s">
            Ponte en contacto con nosotros y uno de nuestros representantes se
            pondrán en contacto contigo.
          </h6>
          
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
    <div className="container clients">
      <div className="row">
        <div className="col text-center">
          <h1>NUESTRAS MARCAS</h1>
          <hr className="separator"></hr>
        </div>
      </div>
      <div className="row row-cols-2 row-cols-md-5 g-3 g-md-4">
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/apera-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/avantor-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/band-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/bd-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/biomerieux-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/condalab-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/dibico-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/dwk-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/eisco-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/fisher.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/hach-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/hanna-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/high-purity-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/honeywell-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/imparlab-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/jt-baker-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/meyer-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/merck-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/microbiologics-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/microflex-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/micron-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/productos-quimicos-monterrey-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/thermo-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/toronto-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/usp-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/vwr-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/whatman-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <Image
              src="/../images/logos/whirl-labor-wasser.webp"
              className="card-img-top"
              alt="Labor Wasser México"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
);
export default HomePage;
