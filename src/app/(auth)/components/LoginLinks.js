"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth";

const LoginLinks = () => {
  const { user } = useAuth({ middleware: "guest" });

  return (
    <div id="LoginLinks">
      {user ? (
        <>
          <p>{user.name}</p>
          <Link href="/dashboard">Dashboard</Link>
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
};

export default LoginLinks;
