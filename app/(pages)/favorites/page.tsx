import ClientOnly from 'shared/ui/ClientOnly'
import EmptyState from 'shared/ui/EmptyState'
import FavoritesClient from './FavoritesClient'
import {
    getFavoriteListings,
    getCurrentUser,
} from 'shared/services/server-actions'

const FavoritesPage = async () => {
    const [listings, currentUser] = await Promise.all([
        getFavoriteListings(),
        getCurrentUser(),
    ])

    if (!listings) {
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
