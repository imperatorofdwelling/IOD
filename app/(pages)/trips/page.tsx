import EmptyState from 'shared/ui/EmptyState'
import ClientOnly from 'shared/ui/ClientOnly'
import { getCurrentUser } from 'shared/api/server-actions'
import TripsClient from './TripsClient'

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Не авторизован"
                    subtitle="Пожалуйста войдите"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient currentUser={currentUser} />
        </ClientOnly>
    )
}

export default TripsPage
