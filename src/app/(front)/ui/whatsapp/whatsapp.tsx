import React from 'react'
import Link from "next/link";

const WhatsappWidget = () => {
  return (
    <div>
      <a
        href="https://wa.me/5215610400441?text=Me%20gustaría%20saber%20el%20precio%20del%20coche"
        className="whatsapp"
        target="_blank">
        {" "}
        <i className="bi bi-whatsapp"></i>
      </a>
    </div>
  );
};

export default WhatsappWidget;