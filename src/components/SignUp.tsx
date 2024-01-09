'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function SignUp() {
  const [role, setRole] = useState('client')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRetype, setPasswordRetype] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const { createUser, updateUserProfile, user } = useAuth()

  const handleSignUp = async () => {
    setError('')
    if (password !== passwordRetype) {
      setError('Пароли не совпадают')
      return
    }
    try {
      await createUser(email, password)
      await updateUserProfile(name)
      setName('')
      setEmail('')
      setPassword('')
      setRole('client')
      setPasswordRetype('')
      toast.success('Успешно')
      console.log({ user })
      router.push('/')
    } catch (error) {
      console.error(error)
      toast.error('Что-то пошло не так')
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Регистрация
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <div>
          <div className="mt-2 flex lg:justify-between items-center justify-center">
            <div className="flex items-center mb-4">
              <input
                id="client-checkbox"
                type="radio"
                name="role"
                value="client"
                checked={role === 'client'}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
              />
              <label className="ms-2 text-sm font-medium text-black ">
                Клиент
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="landlord-checkbox"
                type="radio"
                name="role"
                value="landlord"
                checked={role === 'landlord'}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
              />
              <label className="ms-2 text-sm font-medium text-black ">
                Арендодатель
              </label>
            </div>
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="role"
            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            ФИО
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Иванов Иван Иванович"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="role"
            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Почта
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="example@yandex.ru"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <label
              htmlFor="role"
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
            >
              Пароль
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <label
              htmlFor="passwordRetype"
              className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900 ${
                password !== passwordRetype ? 'text-red-500' : ''
              }`}
            >
              Подтверждение пароля
            </label>
          </div>
          <div className="mt-2">
            <input
              id="passwordRetype"
              name="passwordRetype"
              type="password"
              autoComplete="current-password"
              required
              value={passwordRetype}
              onChange={(e) => setPasswordRetype(e.target.value)}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${
                password !== passwordRetype ? 'ring-red-500' : ''
              }`}
            />
            {password !== passwordRetype && (
              <p className="text-red-500 text-sm mt-2">Пароли не совпадают</p>
            )}
          </div>
        </div>

        <div>
          <button
            onClick={handleSignUp}
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Зарегестрироваться
          </button>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Уже зарегестрированы?{' '}
          <Link
            href="/sign-in"
            className="font-semibold leading-6 text-black hover:text-gray-500"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
