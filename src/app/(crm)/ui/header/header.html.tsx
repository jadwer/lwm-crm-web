import { Button } from "react-bootstrap";

const HeaderTemplate = (props: any) => { return (

<header>
    <div className="container-fluid mt-3">
    <div className="d-flex justify-content-end  pb-3 border-bottom w-100">
      <Button onClick={() => { props.functions.logout()} }>Salir</Button>
    </div>
    </div>
</header>


)}; export default HeaderTemplate