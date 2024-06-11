'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' } )

    return (
        <div id="LoginLinks">
            {user ? (
                <>
                <p>{user.name}</p>
                <Link href="/dashboard">
                    Dashboard
                </Link></>
            ) : (
                <>
                    <Link
                        href="/login"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                    >
                        Registrarse
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
