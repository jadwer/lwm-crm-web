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

  const { contactFormDirect } = useForms();

  const submitContact = async (event: { preventDefault: () => void}) => {
    event.preventDefault();

    
    let dataForm = {
      "nombre" : nombre,
      "tel" : tel,
      "mail" : mail,
      "producto" : producto,
      "cantidad" : cantidad,
      "mensaje" : mensaje,
      "privacidad" : privacidad,
    };
    
    contactFormDirect({setErrors, setStatus}, dataForm);


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
        <form onSubmit={ (e) => { submitContact(e)} }>

            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              id="nombre"
              type="text"
              className="form-control"
              value={nombre}
              onChange={(event) => {setNombre(event.target.value)}}
              required
              placeholder="Nombre completo"></input>


          <label htmlFor="mail" className="form-label">Correo electrónico</label>
            <input
              id="mail"
              type="email"
              className="form-control"
              value={mail}
              onChange={(event) => {setMail(event.target.value)}}
              required
              placeholder="Email válido"></input>

          <label htmlFor="tel" className="form-label">Teléfono</label>
            <input
              id="tel"
              type="tel"
              className="form-control"
              value={tel}
              onChange={(event) => {setTel(event.target.value)}}
              required
              placeholder="Teléfono con lada"></input>

          <label htmlFor="mensaje" className="form-label">Mensaje:</label>
            <textarea
              id="mensaje"
              className="form-control"
              value={mensaje}
              onChange={(event) => {setMensaje(event.target.value)}}
              required
              placeholder="Mensaje"></textarea>

            <Button className="btn btn-primary mt-2" type="submit" id="submit" name="submit">
              ENVIAR
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