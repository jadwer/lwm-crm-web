import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='container-fluid'>
        <div className='row footer'>
          <div className='col-12 col-md-3'>
            <div className='row align-items-md-center d-flex'>
              <div className='col social'>
                <img src="/../images/labor-wasser-mexico-logo-1.png" className="img-fluid logo-footer d-block mx-auto"
                  alt="Labor Wasser México" />
                  <div className='d-flex justify-content-around mt-4'>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-3'>
            <h4>Productos</h4>
            <ul>
              <li><a className="dropdown-item" href="/productos/reactivos">Reactivos</a></li>
              <li><a className="dropdown-item" href="/productos/medios-de-cultivo">Medios de cultivo</a></li>
              <li><a className="dropdown-item" href="/productos/cristaleria">Cristalería</a></li>
              <li><a className="dropdown-item" href="/productos/analisis-de-agua">Analisis de agua</a></li>
              <li><a className="dropdown-item" href="/productos/proceso">Procesos</a></li>
            </ul>
          </div>
          <div className='col-12 col-md-3'>
            <h4>Recursos</h4>
            <ul>
              <li><a className="dropdown-item" href="catalogos">Catálogos</a></li>
              <li><a className="dropdown-item" href="certificados">Certificados</a></li>
              <li><a className="dropdown-item" href="precios">Lista de precios</a></li>
            </ul>
          </div>
          <div className='col-12 col-md-3 login-contact'>
            <h4>Contacto</h4>
            <div className="d-flex"><i className="bi bi-telephone-fill"></i><a href="tel:5575751661">55 7575 1661</a></div>
            <div className="d-flex"><i className="bi bi-telephone-fill"></i><a href="tel:5575751662">55 7575 1662</a></div>
            <div className="d-flex"><i className="bi bi-telephone-fill"></i><a href="tel:5571602454">55 7160 2454</a></div>
            <div className="d-flex"><i className="bi bi-whatsapp"></i><a href="https://wa.link/4e5cqt">56 1040 0441</a></div>
            <div className="d-flex"><i className="bi bi-envelope"></i><a href="mailto:ventas@laborwasserdemexico.com">ventas@laborwasserdemexico.com</a></div>
            <div className="d-flex"><i className="bi bi-geo-alt"></i><a href="#">CDMX y Área metropolitana</a></div>

          </div>
        </div>
        <div className='row text-muted'>
          <p className='text-center'>
            2024. Labor Wasser de México. Todos los Derechos Reservados. 
            &nbsp;<a href="/aviso-privacidad" target='_blank'>Aviso de privacidad.</a>
             &nbsp;Designed and developed by <a href="http://atomosoluciones.com" target='_blank'>AtomoSoluciones.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer