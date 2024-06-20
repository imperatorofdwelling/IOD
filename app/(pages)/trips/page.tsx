import EmptyState from 'shared/ui/EmptyState'
import ClientOnly from 'shared/ui/ClientOnly'
import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import TripsClient from './TripsClient'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Не авторизован" subtitle="Пожалуйста войдите" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
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
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default TripsPage
