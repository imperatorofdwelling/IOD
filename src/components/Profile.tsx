import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useAuth()
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ''
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayName(event.target.value)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      await updateUserProfile(displayName)
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
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/sign-in"
              className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
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
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="mb-4">
          <label className="text-gray-600">Email:</label>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="text-gray-600">UID:</label>
          <p className="text-gray-800">{user.uid}</p>
        </div>
        <div className="mb-4 space-x-2">
          <label className="text-gray-600">Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={handleDisplayNameChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            onClick={handleSave}
            className="rounded-md bg-black text-white px-4 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
          <Link
            href="/"
            className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
