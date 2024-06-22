'use client'

import Container from 'shared/ui/Container'
import ListingHead from 'shared/ui/listings/ListingHead'
import ListingInfo from 'shared/ui/listings/ListingInfo'
import ListingReservation from 'shared/ui/listings/ListingReservation'
import type { SafeListing, SafeReservation, SafeUser } from '@/types'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useEffect, useMemo, useState, type FC } from 'react'
import { Range } from 'react-date-range'
import { useMutationCreateReservationById } from 'shared/services/hooks'

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

interface IListingClient {
    reservations?: SafeReservation[]
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser: SafeUser | null
    apartmentId?: string
}

const ListingClient: FC<IListingClient> = ({
    listing,
    reservations = [],
    currentUser,
}) => {
    const disabledDates = useMemo(() => {
        let dates: Date[] = []
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })

            dates = [...dates, ...range]
        })

        return dates
    }, [reservations])

    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const { mutateAsync, isPending } = useMutationCreateReservationById()

    const onCreateReservation = () => {
        mutateAsync({
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
        }).then(() => setDateRange(initialDateRange))
    }

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            bathroomCount={listing.bathroomCount}
                            guestCount={listing.guestCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isPending}
                                disabledDates={disabledDates}
                                buttonLabel={
                                    isPending ? 'Бронируем...' : 'Забронировать'
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
