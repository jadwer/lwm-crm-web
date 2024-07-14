import Link from "next/link";
import { Button } from "react-bootstrap";

const RegisterTemplate = (props : any) => (


    <main>

<div className="container-fluid login">
      <div className="row align-items-center height-100">
      <div className="col-12 col-md-8 bg-login"></div>
        <div className="col-12 col-md-4 login-form">
        <img className="img-fluid logo" alt="" src="/../images/labor-wasser-mexico-logo2.webp" />
        <form onSubmit={props.functions.submitForm}>
            {/* Name */}
            <div className="d-grid">
                <label htmlFor="name">Nombre completo</label>

                <input
                    id="name"
                    type="text"
                    value={props.data.name}
                    className="block mt-1 w-full"
                    onChange={event => props.functions.setName(event.target.value)}
                    required
                    autoFocus
                />

            </div>

            {/* Email Address */}
            <div className="mt-2 d-grid">
                <label htmlFor="email">Email</label>

                <input
                    id="email"
                    type="email"
                    value={props.data.email}
                    className="block mt-1 w-full"
                    onChange={event => props.functions.setEmail(event.target.value)}
                    required
                />

            </div>

            {/* Password */}
            <div className="mt-2 d-grid">
                <label htmlFor="password">Contraseña</label>

                <input
                    id="password"
                    type="password"
                    value={props.data.password}
                    className="block mt-1 w-full"
                    onChange={event => props.functions.setPassword(event.target.value)}
                    required
                    autoComplete="new-password"
                />

            </div>

            {/* Confirm Password */}
            <div className="mt-2 d-grid">
                <label htmlFor="passwordConfirmation">
                    Confirmar contraseña
                </label>

                <input
                    id="passwordConfirmation"
                    type="password"
                    value={props.data.passwordConfirmation}
                    className="block mt-1 w-full"
                    onChange={event =>
                        props.functions.setPasswordConfirmation(event.target.value)
                    }
                    required
                />

            </div>

            <div className="flex items-center justify-end mt-2">
                <Link href="/login">
                    ¿Ya estás registrado?
                </Link>
                <br></br>
                <Button type="submit" className="ml-4 mt-2">Register</Button>
            </div>
        </form>
        </div>
      </div>
    </div>

            
    </main>


); export default RegisterTemplate;