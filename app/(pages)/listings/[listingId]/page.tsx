import {
    getCurrentUser,
    getDetailApartmentById,
    getReservations,
} from 'shared/services/server-actions'
import EmptyState from 'shared/ui/EmptyState'
import ListingClient from './listingClient'

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const { listingId } = params

    const [listingResult, currentUserResult, reservationsResult] =
        await Promise.all([
            getDetailApartmentById(listingId),
            getCurrentUser(),
            getReservations(params),
        ])

    if (!listingResult) {
        return <EmptyState />
    }

    return (
        <ListingClient
            apartmentId={listingId}
            listing={listingResult}
            currentUser={currentUserResult}
            reservations={reservationsResult}
        />
    )
}

export default ListingPage
