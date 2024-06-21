import {
    getCurrentUser,
    getListingById,
    getReservations,
} from 'shared/api/server-actions'
import ClientOnly from 'shared/ui/ClientOnly'
import EmptyState from 'shared/ui/EmptyState'
import ListingClient from './listingClient'

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const { listingId } = params

    const [listingResult, currentUserResult, reservationsResult] =
        await Promise.all([
            getListingById(listingId),
            getCurrentUser(),
            getReservations(params),
        ])

    if (!listingResult) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient
                currentUser={currentUserResult}
                listing={listingResult}
                reservations={reservationsResult}
            />
        </ClientOnly>
    )
}

export default ListingPage
