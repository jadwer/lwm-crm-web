import { Button } from "react-bootstrap";

const ContactFormTemplate = (props: any) => (
  <main>
    <div className="container-fluid soon">
      <div className="row align-items-center height-100">
        <div className="col-2 d-block mx-auto text-center text-white">
          <form onSubmit={ (e) => { props.functions.submitContact(e)} }>
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              type="text"
              value={props.data.nombre}
              onChange={(event) => {props.functions.setNombre(event.target.value)}}
              required
              placeholder="Nombre completo"></input>
            <label htmlFor="tel">Teléfono:</label>
            <input
              id="tel"
              type="text"
              value={props.data.tel}
              onChange={(event) => {props.functions.setTel(event.target.value)}}
              required
              placeholder="Teléfono con lada"></input>
            <label htmlFor="mail">Email:</label>
            <input
              id="mail"
              type="email"
              value={props.data.mail}
              onChange={(event) => {props.functions.setMail(event.target.value)}}
              required
              placeholder="Email válido"></input>
            <label htmlFor="producto">Producto requerido:</label>
            <input
              id="producto"
              type="text"
              value={props.data.producto}
              onChange={(event) => {props.functions.setProducto(event.target.value)}}
              required
              placeholder="Descripción del producto"></input>
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              id="cantidad"
              type="text"
              value={props.data.cantidad}
              onChange={(event) => {props.functions.setCantidad(event.target.value)}}
              required
              placeholder="Cantidad de productos"></input>
            <label htmlFor="mensaje">Mensaje:</label>
            <input
              id="mensaje"
              type="textarea"
              value={props.data.mensaje}
              onChange={(event) => {props.functions.setMensaje(event.target.value)}}
              required
              placeholder="Mensaje"></input>

            <label htmlFor="privacidad">
              <input 
              id="privacidad"
              type="checkbox"
              value={props.data.privacidad}
              onChange={(event) => {props.functions.setPrivacidad(event.target.checked)}}
              required
              ></input>
              &nbsp;Al enviar aceptas nuestro Aviso de Privacidad
            </label>

            <Button className="ml-3 mt-3" type="submit">
              ¡COTIZA AHORA!
            </Button>
          </form>
        </div>
      </div>
    </div>
  </main>
);
export default ContactFormTemplate;
