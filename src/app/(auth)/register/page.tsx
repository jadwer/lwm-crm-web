"use client";

import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

import RegisterTemplate from "./register.html";
const RegisterPage = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const submitForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    });
  };

  return <RegisterTemplate 
            functions={{setName, setEmail, setPassword, setPasswordConfirmation, setErrors, submitForm}} 
            data={{name, email, password, passwordConfirmation, errors}} />;
};

export default RegisterPage;
