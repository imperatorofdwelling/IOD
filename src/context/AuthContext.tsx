// context/AuthContext.ts
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/app/firebase'

// Определение типов для пользователя
interface User {
  uid: string
  email: string
}

// Определение контекста для аутентификации
interface AuthContextProps {
  user: User | null
  createUser: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

// Компонент-поставщик для контекста аутентификации
export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Пользователь вошел в систему
        setUser({
          uid: authUser.uid,
          email: authUser.email || '',
        })
      } else {
        // Пользователь вышел из системы
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signOutUser = async () => {
    await signOut(auth)
  }

  const value: AuthContextProps = {
    user,
    createUser,
    signIn,
    signOut: signOutUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Хук для удобного использования контекста в компонентах
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}
