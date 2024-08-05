"use client";
import { useState } from "react";
import { useForms } from "@/hooks/forms";
import { Button } from "react-bootstrap";

const Estimate = (props: any) => {

  const prod = props.producto == null ? ("") : props.producto;

  const [nombre, setNombre] = useState("");
  const [tel, setTel] = useState("");
  const [mail, setMail] = useState("");
  const [producto, setProducto] = useState(prod.name);
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [privacidad, setPrivacidad] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);

  const { contactForm } = useForms();

  const submitContact = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let dataForm = {
      nombre: nombre,
      tel: tel,
      mail: mail,
      producto: producto,
      cantidad: cantidad,
      mensaje: mensaje,
      privacidad: privacidad,
    };

    contactForm({ setErrors, setStatus }, dataForm);

    console.log(dataForm);
    console.log(status);
  };
  console.log(props);

  return (
    <nav
      className="offcanvas offcanvas-end"
      id="estimate"
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
          <h6>
            Ponte en contacto con nosotros y uno de nuestros representantes se
            pondrán en contacto contigo.
          </h6>
          <form
            onSubmit={(e) => {
              submitContact(e);
            }}>
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className="form-control"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              required
              placeholder="Nombre completo"></input>

            <label htmlFor="mail" className="form-label">
              Correo electrónico
            </label>
            <input
              id="mail"
              type="email"
              className="form-control"
              value={mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
              required
              placeholder="Email válido"></input>

            <label htmlFor="tel" className="form-label">
              Teléfono
            </label>
            <input
              id="tel"
              type="tel"
              className="form-control"
              value={tel}
              onChange={(event) => {
                setTel(event.target.value);
              }}
              required
              placeholder="Teléfono con lada"></input>

            <label htmlFor="product" className="form-label">
              Producto
            </label>
            <input
              id="product"
              type="text"
              className="form-control"
              value={producto}
              required
              disabled></input>

            <label htmlFor="cant" className="form-label">
              Cantidad
            </label>
            <input
              id="cant"
              type="text"
              className="form-control"
              value={cantidad}
              onChange={(event) => {
                setCantidad(event.target.value);
              }}
              required
              placeholder="Cantidad requerida"></input>

            <label htmlFor="mensaje" className="form-label">
              Mensaje:
            </label>
            <textarea
              id="mensaje"
              className="form-control"
              value={mensaje}
              onChange={(event) => {
                setMensaje(event.target.value);
              }}
              required
              placeholder="Mensaje"></textarea>

            <Button
              className="btn btn-primary mt-2"
              type="submit"
              id="submit"
              name="submit">
              ENVIAR
            </Button>
          </form>
          {status != null ? (
            <div className="send-form">
              Tu mensaje se ha enviado. Nos comunicaremos contigo a la brevedad.
            </div>
          ) : null}
          <br></br>
        </div>
      </div>
    </nav>
  );
};

export default Estimate;
