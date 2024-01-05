// components/ProtectedRoute.js
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/sign-in')
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
