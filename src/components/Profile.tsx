'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const ProfilePage: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="mb-4">
          <label className="text-gray-600">Email:</label>
          <p className="text-gray-800">{user && user.email}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-600">UID:</label>
          <p className="text-gray-800">{user && user.uid}</p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
