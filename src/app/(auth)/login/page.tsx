"use client";
import LoginTemplate from "./login.html";

import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'


const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  const reset = searchParams.get('reset')

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (reset && reset?.length > 0 && errors.length === 0) {
      setStatus(atob(reset));
    } else {
      setStatus(null);
    }
  }, [reset, errors.length]);

  const submitForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
    console.log({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
    router.push('/dashboard')
  };

  return (
    <LoginTemplate
      functions={{ submitForm, setEmail, setPassword, setShouldRemember }}
      data={{ email, password }}
    />
  );
};

export default LoginPage;
