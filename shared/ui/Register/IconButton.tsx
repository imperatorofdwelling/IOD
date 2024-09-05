'use client'
import { IconType } from 'react-icons'
import { TERipple } from 'tw-elements-react'

interface IIconButton {
  icon?: IconType
}

const IconButton: React.FC<IIconButton> = ({
  icon: Icon,
}) => {
  return (
    <TERipple>
      <button
      >
        {Icon && <Icon size={32}/>}
      </button>
    </TERipple>
  )
}

export default IconButton