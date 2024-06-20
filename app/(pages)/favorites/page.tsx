import ClientOnly from 'shared/ui/ClientOnly'
import EmptyState from 'shared/ui/EmptyState'
import getFavoriteListings from '@/actions/getFavoriteListings'
import getCurrentUser from '@/actions/getCurrentUser'
import FavoritesClient from './FavoritesClient'

const FavoritesPage = async () => {
  const [listings, currentUser] = await Promise.all([
    getFavoriteListings(),
    getCurrentUser(),
  ])

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Нет избранных"
          subtitle="Пожалуйста, добавьте квартиру в избранное"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavoritesPage
