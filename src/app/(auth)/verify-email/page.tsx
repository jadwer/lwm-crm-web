'use client'
import VerifyEmailTemplate from "./verifyEmail.html";
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const VerifyEmailPage = (props : any) => {

  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/dashboard',
})

const [status, setStatus] = useState(null)

  return (
    <VerifyEmailTemplate functions = {{logout, resendEmailVerification, setStatus}} data="status"/>
  );
};

export default VerifyEmailPage;
