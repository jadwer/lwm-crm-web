import Link from "next/link";

const MensajeTemplate = () => (

  <main>

    <div className="container-fluid hero-sections mx-auto">
      <div className="container">
        <div className="row align-items-center">
            <h1>Cotización enviada</h1>
        </div>
      </div>
    </div>
    <div className="container my-4">
      <div className="row">
      <br />
      <h3 className="text-justify">¡Tu mensaje de cotización ha sido enviado! En breve nos pondremos en contacto contigo. Aun así, recuerda que puedes contactarnos desde WhatsApp al <a href="https://wa.link/4e5cqt">56 1040 0441</a> </h3>
      <br></br>
            <Link
              href="/productos/todos"
              className="btn btn-secondary mt-2 me-4">
              Regresar
            </Link>
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


); export default MensajeTemplate;
