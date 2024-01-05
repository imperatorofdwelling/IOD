'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

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
      </div>
    </div>
  )
}

export default ProfilePage
