import EmptyState from 'shared/ui/EmptyState'
import { getCurrentUser } from 'shared/services/server-actions'
import TripsClient from './TripsClient'

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState title="Не авторизован" subtitle="Пожалуйста войдите" />
        )
    }

    return <TripsClient currentUser={currentUser} />
}

export default TripsPage
