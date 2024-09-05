'use client'

import Image from 'next/image'

const Logo = () => {
  return (
    <Image
      className="rounded-full"
      height={64}
      width={64}
      alt="Logo"
      src={'/images/logo.png'}
    />
  )
}

export default Logo
