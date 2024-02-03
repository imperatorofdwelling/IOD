'use client'

import useCities from '@/hooks/useCities'
import { SafeUser } from '@/types'
import { Listing, Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface IListingCard {
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const ListingCard: React.FC<IListingCard> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter()
  const { getByValue } = useCities()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [onAction, actionId, disabled]
  )

  return <div>Enter</div>
}

export default ListingCard
