import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='container-fluid'>
        <div className='row footer'>
          <div className='col-12 col-md-3'>
            <div className='row align-items-md-center d-flex'>
              <div className='col'>
                <img src="/../images/labor-wasser-mexico-logo-1.png" className="img-fluid logo-footer d-block mx-auto"
                  alt="Labor Wasser México" />
              </div>
            </div>
          </div>
          <div className='col-12 col-md-3'>
            <h4>Productos</h4>
             <ul>
              <li><a className="dropdown-item" href="soon">Reactivos</a></li>
              <li><a className="dropdown-item" href="soon">Medios de cultivo</a></li>
              <li><a className="dropdown-item" href="soon">Cristalería</a></li>
              <li><a className="dropdown-item" href="soon">Analisis de agua</a></li>
              <li><a className="dropdown-item" href="soon">Procesos</a></li>
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
          <div className='col-12 col-md-3'>
          <h4>Contacto</h4>
             <ul>
              <li>55 7575 1661</li>
              <li>55 7575 1662</li>
              <li>55 7160 2454</li>
              <br></br>
              <li>56 1040 0441</li>
              <br></br>
              <li>ventas@laborwasserdemexico.com</li>
              <br></br>
              <li>CDMX y área metropolitana</li>
            </ul>
          </div>
        </div>
        <div className='row text-muted'>
          <p className='text-center'>
            Designed and developed by <a href="http://atomosoluciones.com" target='_blank'>AtomoSoluciones.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer