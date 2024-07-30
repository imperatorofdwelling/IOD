'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
    <Image
      alt="logo"
      className="hidden md:block cursor-pointer"
      height={50}
      width={50}
      src="/images/logo-light.svg"
      onClick={() => router.push('/')}
    />
  )
}

export default Logo
