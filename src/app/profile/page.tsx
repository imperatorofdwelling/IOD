'use client'
import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'
import ProtectedRoute from '../protectedRoute'

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <Profile />
    </ProtectedRoute>
  )
}

export default ProfilePage
