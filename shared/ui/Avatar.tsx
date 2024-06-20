'use client'

import Image from 'next/image'

interface IAvatar {
  src: string | null | undefined
}

const Avatar: React.FC<IAvatar> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src || '/images/defaultAvatar2.jpg'}
    />
  )
}

export default Avatar
