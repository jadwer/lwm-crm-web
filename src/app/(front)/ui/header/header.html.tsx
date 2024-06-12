import LoginLinks from '@/app/(auth)/components/LoginLinks'
const HeaderTemplate = () => {
  return (

    <header>
      <div className="container-fluid d-flex justify-content-between align-items-md-center py-3 border-bottom">
        <img className="img-fluid logo" alt="" src="/../images/labor-wasser-mexico-logo2.webp" />
        <LoginLinks />

        <button
          type="button"
          className="btn btn-primary me-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#navMenu">
          <i className="bi bi-list"></i>
        </button>
      </div>
    </header>


  )
}; export default HeaderTemplate