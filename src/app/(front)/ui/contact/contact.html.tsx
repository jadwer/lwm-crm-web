"use client"
import { useState } from "react"
import ContactFormTemplate from "./contact.html"
import { useForms } from "@/hooks/forms"
import { Button } from "react-bootstrap"

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [tel, setTel] = useState("");
  const [mail, setMail] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [privacidad, setPrivacidad] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState([]);

  const { contactForm } = useForms();

  const submitContact = async (event: { preventDefault: () => void}) => {
    event.preventDefault();

    
    let dataForm = [nombre, tel, mail, producto, cantidad, mensaje, privacidad];
    
    contactForm({setErrors, setStatus}, dataForm);


    console.log(dataForm);
    console.log(status);

  }
  
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

        <form onSubmit={ (e) => { submitContact(e)} }>
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(event) => {setNombre(event.target.value)}}
              required
              placeholder="Nombre completo"></input>
            <label htmlFor="tel">Teléfono:</label>
            <input
              id="tel"
              type="text"
              value={tel}
              onChange={(event) => {setTel(event.target.value)}}
              required
              placeholder="Teléfono con lada"></input>
            <label htmlFor="mail">Email:</label>
            <input
              id="mail"
              type="email"
              value={mail}
              onChange={(event) => {setMail(event.target.value)}}
              required
              placeholder="Email válido"></input>
            <label htmlFor="producto">Producto requerido:</label>
            <input
              id="producto"
              type="text"
              value={producto}
              onChange={(event) => {setProducto(event.target.value)}}
              required
              placeholder="Descripción del producto"></input>
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              id="cantidad"
              type="text"
              value={cantidad}
              onChange={(event) => {setCantidad(event.target.value)}}
              required
              placeholder="Cantidad de productos"></input>
            <label htmlFor="mensaje">Mensaje:</label>
            <input
              id="mensaje"
              type="textarea"
              value={mensaje}
              onChange={(event) => {setMensaje(event.target.value)}}
              required
              placeholder="Mensaje"></input>

            <label htmlFor="privacidad">
              <input 
              id="privacidad"
              type="checkbox"
              onChange={(event) => {setPrivacidad(event.target.checked)}}
              required
              ></input>
              &nbsp;Al enviar aceptas nuestro Aviso de Privacidad
            </label>

            <Button className="ml-3 mt-3" type="submit">
              ¡COTIZA AHORA!
            </Button>
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
)
}


export default Contact;