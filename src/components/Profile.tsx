import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useAuth()
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ''
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addProductCard = async (cardData: {
    name: string
    address: string
  }) => {
    try {
      const res = await fetch('/api/addProductCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: user?.uid, ...cardData }),
      })

      const data = await res.json()

      if (res.ok) {
        console.log('Продукт добавлен', data)
      } else {
        console.error('Ошибка при добавлении', data.error)
      }
    } catch (error) {
      console.error('Ошибка при добавлении', error)
    }
  }

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayName(event.target.value)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      await updateUserProfile(displayName)
      await addProductCard({
        name: 'Example Product',
        address: 'Example Address',
      })
      console.log({ user })
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <p className="text-gray-800 mb-4">
            Please sign in to view your profile.
          </p>
          <div className="mt-10 flex items-center justify-center space-x-4">
            <Link
              href="/sign-in"
              className="py-2 px-4 bg-black text-white rounded-md font-semibold hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Профиль</h2>
        <div className="mb-4">
          <label className="text-gray-600">Почта:</label>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-gray-600">ФИО:</label>
          <p className="text-gray-800">{user.displayName}</p>
          {/* <input
            type="text"
            value={displayName}
            onChange={handleDisplayNameChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          /> */}
        </div>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-black text-white rounded-md font-semibold hover:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить профиль'}
          </button>
          <Link
            href="/"
            className="py-2 px-2 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
