import { Button } from "react-bootstrap";

const HeaderTemplate = (props: any) => { return (

<header>
    <div className="d-flex justify-content-around align-items-md-center pb-3 border-bottom w-100">
      <h1 className="h4">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none">
          
          <span>Labor Wasser Mexico </span>
        </a>
      </h1>
      <Button onClick={() => { props.functions.logout()} }>Salir</Button>

    </div>
  </header>


)}; export default HeaderTemplate