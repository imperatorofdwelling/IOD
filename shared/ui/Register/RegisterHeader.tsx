'use client'

import Logo from "../Logo"

interface IRegisterHeader {
  title: string | null | undefined
}

const RegisterHeader: React.FC<IRegisterHeader> = ({title}) => {
  return (
    <div className='text-[48px] flex flex-col gap-[24px] font-boldSans'>
      <Logo />
      {title}
    </div>
  )
}

export default RegisterHeader
