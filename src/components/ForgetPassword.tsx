'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-toastify'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const { passwordResetEmail } = useAuth()

  const handleSignIn = async () => {
    try {
      await passwordResetEmail(email)
      setEmail('')
      router.push('/sign-in')
      toast.success('Письмо отправлено на почту')
    } catch (error) {
      console.error(error)
      toast.error('Что-то пошло не так')
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Восстановление пароля
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Почта
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleSignIn}
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Сбросить пароль
          </button>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Не зарегестрирован?{' '}
          <Link
            href="/sign-up"
            className="font-semibold leading-6 text-black hover:text-gray-500"
          >
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  )
}
