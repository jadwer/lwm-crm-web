import LoginLinks from '@/app/(auth)/components/LoginLinks'
const HeaderTemplate = () => {
  return (
    
    <header>
      <div className="container-fluid d-flex py-3 border-bottom">
        <div className='col-12 col-md-6 d-flex align-items-md-center'>
        <a href='#'>
          <img className="img-fluid logo" alt="" src="/../images/labor-wasser-mexico-logo2.webp" />
          </a>
        </div>
        <div className='col-12 col-md-6 d-flex align-items-md-center justify-content-end'>
        <LoginLinks />
        <button
          type="button"
          className="burger btn btn-primary me-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#navMenu">
          <i className="bi bi-list"></i>
        </button></div>
      </div>
      
    </header>


  )
}; export default HeaderTemplate