import { Button } from "react-bootstrap";

const VerifyEmailTemplate = (props: any) => (
  <main>
    <div className="mb-4 text-sm text-gray-600">
      !Gracias por registrarte! Antes de comenzar, ¿podría verificar su
      dirección de correo electrónico haciendo clic en el enlace que le acabamos
      de enviar por correo electrónico? Si no recibió el correo electrónico, con
      gusto le enviaremos otro.
    </div>

    {props.data.status === "verification-link-sent" && (
      <div className="mb-4 font-medium text-sm text-green-600">
       Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionó durante el registro.
      </div>
    )}

    <div className="mt-4 flex items-center justify-between">
      <Button
        onClick={(event) =>
          props.functions.resendEmailVerification(props.functions.setStatus)
        }>
        Reenviar correo electrónico de verificación
      </Button>

      <button
        type="button"
        className="underline text-sm text-gray-600 hover:text-gray-900"
        onClick={props.functions.logout}>
        Cerrar Sesión
      </button>
    </div>
  </main>
);
export default VerifyEmailTemplate;
