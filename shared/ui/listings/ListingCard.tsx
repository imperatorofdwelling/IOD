'use client'

import useCities from 'shared/hooks/useCities'
import { SafeUser } from '@/types'
import { type FC, useMemo } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import HeartButton from '../HeartButton'
import { BiRuble } from 'react-icons/bi'
import Button from '../Button'
import Link from 'next/link'
import { getReservations } from 'shared/services/server-actions'

type TReservation = Awaited<ReturnType<typeof getReservations>>[number]
type TListing = Omit<TReservation['listing'], 'createdAt'> & {
    createdAt: string | Date
}

interface IListingCard {
    reservation?: TReservation
    disabled?: boolean
    actionLabel?: string
    currentUser?: SafeUser | null
    data?: TListing
    onAction?: (...args: any) => any
}

const ListingCard: FC<IListingCard> = ({
    reservation,
    disabled,
    actionLabel,
    currentUser,
    data,
    onAction,
}) => {
    const listing: TListing | undefined = data ?? reservation?.listing

    const { getByValue } = useCities()
    const location = getByValue(listing?.locationValue || '')

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }
        return listing?.price
    }, [reservation, listing?.price])

    return (
        <div className="col-span-1 cursor-pointer group">
            <Link
                href={`/apartment-details/${listing?.id}`}
                className="flex flex-col gap-2 w-full"
            >
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        alt="Listing Card"
                        src={listing?.imageSrc || ''}
                        className="object-cover h-full w-full group-hover:scale-100 transition"
                        fill
                    />
                    <div className="absolute top-3 right-3 z-100">
                        <HeartButton
                            listingId={listing?.id ?? ''}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.value}
                </div>
                <div className="flex flex-row items-center">
                    <BiRuble size={18} className="text-neutral-600" />
                    <div className="font-semibold ">{price}</div>
                    <div>
                        {!reservation && (
                            <div className="font-light">/ сутки</div>
                        )}
                    </div>
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={(e) => {
                            e.preventDefault()
                            onAction()
                        }}
                    />
                )}
            </Link>
        </div>
    )
}

export default ListingCard
