'use client'

import type { SafeUser } from '@/types'
import Heading from 'shared/ui/Heading'
import ListingCard from 'shared/ui/listings/ListingCard'
import Container from 'shared/ui/Container'
import getReservations from '@/actions/getReservations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ClientOnly from 'shared/ui/ClientOnly'
import EmptyState from 'shared/ui/EmptyState'
import { Loader } from 'shared/ui/Loader'
import { $axios, AxiosError } from 'shared/axios'
import toast from 'react-hot-toast'

interface TripsClientProps {
    currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({ currentUser }) => {
    const queryClient = useQueryClient()

    const {
        data: reservationsData,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['reservations'],
        queryFn: () => getReservations({ userId: currentUser?.id || '' }),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (actionId: string) => {
            return $axios.delete(`reservations/${actionId}`)
        },
        onSuccess: () => {
            toast.success('Отменено')
            queryClient.invalidateQueries({ queryKey: ['reservations'] })
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.error)
            }
        },
    })

    if (isLoading) {
        return <Loader />
    }

    if (!reservationsData?.length && !isLoading) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Нет бронированных квартир"
                    subtitle="Пожалуйста создайте бронь"
                />
            </ClientOnly>
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
                        actionLabel="Cancel reservation"
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
