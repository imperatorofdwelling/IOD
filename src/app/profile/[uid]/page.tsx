'use client'
import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'
import { useRouter } from 'next/router'

const ProfilePage = () => {
  const router = useRouter()
  const { uid } = router.query
  return (
    <>
      <Navbar />
      <Profile uid={uid} />
    </>
  )
}

export default ProfilePage
