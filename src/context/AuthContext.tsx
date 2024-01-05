// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseAuthUser,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth'
import { auth } from '@/app/firebase'

interface User {
  uid: string
  email: string
  displayName: string
}

interface AuthContextProps {
  user: User | null
  createUser: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (displayName: string) => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          email: authUser.email || '',
          displayName: authUser.displayName || '',
        })
      } else {
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

  const updateUserProfile = async (displayName: string) => {
    const authUser: FirebaseAuthUser | null = auth.currentUser

    if (authUser) {
      // Обновляем имя пользователя
      await updateFirebaseProfile(authUser, { displayName })

      // Обновляем локальное состояние пользователя
      setUser({
        ...user!,
        displayName,
      })
    }
  }

  const value: AuthContextProps = {
    user,
    createUser,
    signIn,
    signOut: signOutUser,
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}
