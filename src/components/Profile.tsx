import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-gray-600">UID:</label>
          <p className="text-gray-800">{user.uid}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
