"use client"
import { useState } from "react"
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
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);

  const { contactForm } = useForms();

  const submitContact = async (event: { preventDefault: () => void }) => {
    event.preventDefault();


    let dataForm = {
      "nombre": nombre,
      "tel": tel,
      "mail": mail,
      "producto": producto,
      "cantidad": cantidad,
      "mensaje": mensaje,
      "privacidad": privacidad,
    };

    contactForm({ setErrors, setStatus }, dataForm);


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
          <form onSubmit={(e) => { submitContact(e) }}>

            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              id="nombre"
              type="text"
              className="form-control"
              value={nombre}
              onChange={(event) => { setNombre(event.target.value) }}
              required
              placeholder="Nombre completo"></input>


            <label htmlFor="mail" className="form-label">Correo electrónico</label>
            <input
              id="mail"
              type="email"
              className="form-control"
              value={mail}
              onChange={(event) => { setMail(event.target.value) }}
              required
              placeholder="Email válido"></input>

            <label htmlFor="tel" className="form-label">Teléfono</label>
            <input
              id="tel"
              type="tel"
              className="form-control"
              value={tel}
              onChange={(event) => { setTel(event.target.value) }}
              required
              placeholder="Teléfono con lada"></input>

            <label htmlFor="mensaje" className="form-label">Mensaje:</label>
            <textarea
              id="mensaje"
              className="form-control"
              value={mensaje}
              onChange={(event) => { setMensaje(event.target.value) }}
              required
              placeholder="Mensaje"></textarea>

            <Button className="btn btn-primary mt-2" type="submit" id="submit" name="submit">
              ENVIAR
            </Button>
          </form>
          {(status != null) ? <div className="send-form">Tu mensaje se ha enviado. Nos comunicaremos contigo a la brevedad.</div> : null}

          <br></br>
          <div className="col-12 login-contact">
            <div className="d-flex"><i className="bi bi-telephone-fill"></i><a href="tel:5575751661">55 7575 1661</a></div>
            <div className="d-flex"><i className="bi bi-telephone-fill"></i><a href="tel:5575751662">55 7575 1662</a></div>
            <div className="d-flex"><i className="bi bi-telephone-fill"></i><a href="tel:5571602454">55 7160 2454</a></div>
            <div className="d-flex"><i className="bi bi-whatsapp"></i><a href="https://wa.link/4e5cqt">56 1040 0441</a></div>
            <div className="d-flex"><i className="bi bi-envelope"></i><a href="mailto:ventas@laborwasserdemexico.com">ventas@laborwasserdemexico.com</a></div>
            <div className="d-flex"><i className="bi bi-geo-alt"></i><a href="#">CDMX y Área metropolitana</a></div>
          </div>
        </div>
      </div>
    </nav>
  )
}


export default Contact;