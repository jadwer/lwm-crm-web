import Link from "next/link";
import { Button } from "react-bootstrap";
const LoginTemplate = (props: any) => (


  <main>

    <div className="container-fluid login">
      <div className="row align-items-center height-100">
      <div className="col-12 col-md-8 bg-login"></div>
        <div className="col-12 col-md-4 login-form">
        <img className="img-fluid logo" alt="" src="/../images/labor-wasser-mexico-logo2.webp" />
          <form onSubmit={(e) => { props.functions.submitForm(e) }}>
            {/* Email Address */}
            <div className="d-grid">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                value={props.data.email}
                className="block mt-1 w-full"
                onChange={(event) => props.functions.setEmail(event.target.value)}
                required
                autoFocus
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
                onChange={(event) => props.functions.setPassword(event.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {/* Remember Me */}
            <div className="block mt-2">
              <label htmlFor="remember_me" className="inline-flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  name="remember"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(event) => props.functions.setShouldRemember(event.target.checked)}
                />

                <span className="ml-2 text-sm text-gray-600">Recordarme</span>
              </label>
            </div>
      
            <div className="flex items-center justify-end mt-2">
              <Link
                href="/forgot-password"
                className="underline text-sm text-gray-600 hover:text-gray-900">
                ¿Olvidaste tu contraseña?
              </Link>
              <br></br>
              <Button className="ml-3 mt-3" type="submit">Ingresar</Button>
            </div>
          </form>{" "}
        </div>
      </div>
    </div>

  </main>



); export default LoginTemplate;
