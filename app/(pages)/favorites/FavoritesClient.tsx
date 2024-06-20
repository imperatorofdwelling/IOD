import Container from 'shared/ui/Container'
import Heading from 'shared/ui/Heading'
import ListingCard from 'shared/ui/listings/ListingCard'
import type { SafeListing, SafeUser } from '@/types'

interface IFavoritesClient {
  listings: SafeListing[]
  currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<IFavoritesClient> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Избранное" />
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:gris-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={{ ...listing, createdAt: new Date(listing.createdAt) }}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
