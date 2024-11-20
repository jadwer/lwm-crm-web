import React from 'react'
import Link from "next/link";

const WhatsappWidget = () => {
  return (
    <div>
      <a
        href="https://wa.me/5215610400441?text=¡Hola!%20¿Cómo%20%20podemos%20ayudarte%3F"
        className="whatsapp"
        target="_blank">
        {" "}
        <i className="bi bi-whatsapp"></i>
      </a>
    </div>
  );
};

export default WhatsappWidget;