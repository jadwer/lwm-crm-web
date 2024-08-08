"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth";

const LoginLinks = () => {
  return(        <>
    <div className="sesion">
      <Link href="/login">Login</Link>
    </div>
    <span>&nbsp;|&nbsp;</span>
    <div className="sesion">
      <Link href="/register">Registrarse</Link>
    </div>
  </>
);
 // const { user } = useAuth({ middleware: "guest" });

/*   return (
    <div id="LoginLinks">
      {user ? (
        <>
          <p>{user.name}</p>
          <Link className="sesion" href="/dashboard">Dashboard</Link>
        </>
      ) : (
        <>
          <div className="sesion">
            <Link href="/login">Login</Link>
          </div>
          <span>&nbsp;|&nbsp;</span>
          <div className="sesion">
            <Link href="/register">Registrarse</Link>
          </div>
        </>
      )}
    </div>
  );
 */};

export default LoginLinks;
