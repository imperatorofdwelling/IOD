'use client'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { SafeUser } from '@/types'
import useFavorite from 'shared/hooks/usefavorite'

interface IHeartButton {
    listingId: string
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<IHeartButton> = ({ listingId, currentUser }) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser,
    })

    return (
        <div
            onClick={toggleFavorite}
            className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
        >
            <AiOutlineHeart
                size={28}
                className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
            />
            <AiFillHeart
                size={24}
                className={
                    hasFavorited ? 'fill-red-500' : 'fill-neutral-500/70'
                }
            />
        </div>
    )
}

export default HeartButton