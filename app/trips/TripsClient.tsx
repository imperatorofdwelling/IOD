'use client'

import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import { SafeReservation, SafeUser } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface ITripsClient {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const TripsClient: React.FC<ITripsClient> = ({ reservations, currentUser }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')
  const onCancle = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Успешно удалено')
          router.refresh()
        })
        .catch((error) => {
          toast.error('Не удалось отменить бронирование')
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )
  return (
    <Container>
      <Heading title="Бронь" subtitle="Бронированные палатки" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gris-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancle}
            disabled={deletingId === reservation.id}
            actionLabel="Отменить бронирование"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
