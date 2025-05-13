// Archivo: src/components/AuthenticatedLayout.tsx

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/login')
      } else {
        setReady(true)
      }
    }
  }, [user, isLoading, router])

  if (!ready) {
return (
  <div className="flex justify-center items-center h-screen text-gray-500">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
    <span className="ml-3">Cargando sesión...</span>
  </div>
)  }

  return <>{children}</>
}
