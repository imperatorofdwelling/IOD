'use client'

import type { SafeUser } from '@/types'
import Heading from 'shared/ui/Heading'
import ListingCard from 'shared/ui/listings/ListingCard'
import Container from 'shared/ui/Container'
import EmptyState from 'shared/ui/EmptyState'
import { Loader } from 'shared/ui/Loader'
import {
    useGetReservations,
    useMutationDeleteReservationById,
} from 'shared/services/hooks'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

interface TripsClientProps {
    currentUser?: SafeUser | null
}

export const UserReservationsClient: React.FC<TripsClientProps> = ({
    currentUser,
}) => {
    const {
        data: reservationsData,
        isError,
        isLoading,
    } = useGetReservations(currentUser?.id || '')
    const toustIdRef = useRef<any>(null)

    const { mutate, isPending, isSuccess } = useMutationDeleteReservationById()

    useEffect(() => {
        if (isPending) {
            toustIdRef.current = toast.loading('Отмена бронирования...')
        }
        if (isSuccess) {
            toast.dismiss(toustIdRef.current)
        }
    }, [isPending, isSuccess])

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return (
            <EmptyState
                title="Ошибка получения данных"
                subtitle="Пожалуйста, обратитесь в службу поддержки или попробуйте позже."
            />
        )
    }

    if (!reservationsData?.length && !isLoading) {
        return (
            <EmptyState
                title="Нет бронированных квартир"
                subtitle="Пожалуйста создайте бронь"
            />
        )
    }

    return (
        <Container>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going"
            />
            <div
                className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
            >
                {reservationsData?.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        reservation={reservation}
                        actionLabel="Отменить бронирование"
                        currentUser={currentUser}
                        onAction={() => mutate(reservation.id)}
                        disabled={isPending}
                    />
                ))}
            </div>
        </Container>
    )
}
