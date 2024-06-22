import {
    getCurrentUser,
    getDetailApartmentById,
    getReservations,
} from 'shared/services/server-actions'
import EmptyState from 'shared/ui/EmptyState'
import { ApartmentDetailsClient } from './ApartmentDetailsClient'

interface IParams {
    apartmentId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const { apartmentId } = params

    const [listingResult, currentUserResult, reservationsResult] =
        await Promise.all([
            getDetailApartmentById(apartmentId),
            getCurrentUser(),
            getReservations(params),
        ])

    if (!listingResult) {
        return <EmptyState />
    }

    return (
        <ApartmentDetailsClient
            apartmentId={apartmentId}
            listing={listingResult}
            currentUser={currentUserResult}
            reservations={reservationsResult}
        />
    )
}

export default ListingPage
