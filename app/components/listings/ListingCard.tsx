'use client'

import useCities from '@/hooks/useCities'
import { SafeUser } from '@/types'
import { Listing, Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'

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

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt="Listing Card"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />
        </div>
      </div>
    </div>
  )
}

export default ListingCard
