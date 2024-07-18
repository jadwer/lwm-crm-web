import React from 'react'
import Link from "next/link";

const WhatsappWidget = () => {
  return (
    <div>
      <Link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></Link>
      <a
        href="https://wa.me/5215610400441?text=Me%20gustaría%20saber%20el%20precio%20del%20coche"
        className="whatsapp"
        target="_blank">
        {" "}
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
    </div>
  );
};

export default WhatsappWidget;