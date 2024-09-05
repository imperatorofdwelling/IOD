'use client'

import { TERipple } from 'tw-elements-react'

interface ISignButton {
  lavel: string | null | undefined
}

const SignButton: React.FC<ISignButton> = ({lavel}) => {
  return (
    <TERipple>
      <button className="rounded-lg w-full bg-[#006BE6] h-[56px] text-[16px] font-semibold">
        {lavel}
      </button>
    </TERipple>
  )
}

export default SignButton
