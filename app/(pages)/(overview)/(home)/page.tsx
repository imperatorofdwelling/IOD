import { getListings, getCurrentUser } from 'shared/services/server-actions'
import Container from 'shared/ui/Container'
import EmptyState from 'shared/ui/EmptyState'
import ListingCard from 'shared/ui/listings/ListingCard'

const Home = async () => {
    const [ligstings, currentUser] = await Promise.all([
        getListings(),
        getCurrentUser(),
    ])

    if (!ligstings) {
        return <EmptyState showReset />
    }

    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {ligstings.map((listing) => {
                    return (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            currentUser={currentUser}
                        />
                    )
                })}
            </div>
        </Container>
    )
}
export default Home