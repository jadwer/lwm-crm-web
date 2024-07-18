"use client"
import { useState } from "react"
import ContactFormTemplate from "./contact.html"
import { useForms } from "@/hooks/forms"

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
    <ContactFormTemplate 
    functions={{submitContact, setNombre, setTel, setMail, setProducto, setCantidad, setMensaje, setPrivacidad}}
    data={{nombre, tel, mail, producto, cantidad, mensaje, privacidad}} />
  )
}

export default Contact