import EmptyState from 'shared/ui/EmptyState'
import { UserRentalsClient } from './UserRentalsClient'
import {
    getCurrentUser,
    getListingsUserId,
} from 'shared/services/server-actions'

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="Не авторизован" subtitle="Пожалуйста войдите" />
        )
    }

    const listings = await getListingsUserId(currentUser.id)

    if (!listings.length) {
        return <EmptyState title="Нет  квартир" />
    }

    return <UserRentalsClient currentUser={currentUser} />
}

export default PropertiesPage
