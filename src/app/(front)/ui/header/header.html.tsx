import LoginLinks from '@/app/(auth)/components/LoginLinks';
import WhatsappWidget from "../whatsapp/whatsapp"

const HeaderTemplate = () => {
  return (
    <>
      <header className='d-none d-lg-block'>
        <div className="container-fluid py-3 border-bottom">
          <div className='row d-flex align-items-center'>
            <div className='col-6 col-md-6 d-flex'>
              <a href='/'>
                <img className="img-fluid logo" alt="" src="/../images/labor-wasser-mexico-logo2.webp" />
              </a>
            </div>
            <div className='col-6 col-md-6 d-flex justify-content-end align-items-center'>
              <LoginLinks />
              <button
                type="button"
                className="burger btn btn-primary me-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#navMenu">
                {/* <i className="bi bi-list"></i> */}
                <img src="/../images/labor-wasser-contacto.svg" className="contact-head"
              alt="Labor Wasser México" />
              </button></div>
          </div>
        </div>
      </header>
      {/* MENU RESPONSIVO /> */}
      <header className='d-block d-lg-none'>
        <div className="container-fluid py-3 border-bottom">
          <div className='row d-flex align-items-center'>
            <div className='col-8 d-flex'>
              <a href='/'>
                <img className="img-fluid logo" alt="" src="/../images/labor-wasser-mexico-logo2.webp" />
              </a>
            </div>
            <div className='col-4 d-flex justify-content-end align-items-center'>
              {/* <LoginLinks /> */}
              <button
                type="button"
                className="burger btn btn-primary me-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#navMenu">
                <img src="/../images/labor-wasser-contacto.svg" className="contact-head"
              alt="Labor Wasser México" />
              </button></div>
          </div>
        </div>
      </header>
      <WhatsappWidget></WhatsappWidget>
    </>


  )
}; export default HeaderTemplate