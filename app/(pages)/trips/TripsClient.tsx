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

interface TripsClientProps {
    currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({ currentUser }) => {
    const {
        data: reservationsData,
        isError,
        isLoading,
    } = useGetReservations(currentUser?.id || '')

    const { mutate, isPending } = useMutationDeleteReservationById()

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

export default TripsClient
