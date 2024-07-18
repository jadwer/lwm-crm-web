const ContactFormTemplate = (props: any) => {
    return (
  
      <nav
        className="offcanvas offcanvas-end"
        id="navMenu"
        aria-labelledby="navMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="navMenuLabel">
            CONTACTO
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <h6>Ponte en contacto con nosotros y uno de nuestros representantes se pondrán en contacto contigo.</h6>
            <form>
              <label className="form-label">Nombre completo</label>
              <input type="text" className="form-control" id="Nombre completo"></input>
              <label className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" id="correo electrónico"></input>
              <label className="form-label">Teléfono</label>
              <input type="tel" className="form-control" id="Telefono"></input>
              <label className="form-label">Mensaje</label>
                      <textarea className="form-control" id="Mensaje" /*rows="3"*/></textarea>
                      <button type="submit" className="btn btn-primary mt-2">Enviar</button>
            </form>
            <br></br>
            <div className="col-12 login-contact">
            <ul>
                <li>55 7575 1661 | 55 7575 1662 | 55 7160 2454</li>
                <br></br>
                <li>56 1040 0441</li>
                <br></br>
                <li>ventas@laborwasserdemexico.com</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
  
  
    );
  }; export default ContactFormTemplate;
  