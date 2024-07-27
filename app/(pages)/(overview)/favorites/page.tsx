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
            <EmptyState
                title="Нет избранных"
                subtitle="Пожалуйста, добавьте квартиру в избранное"
            />
        )
    }

    return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default FavoritesPage
