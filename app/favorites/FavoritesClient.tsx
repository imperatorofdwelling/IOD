import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import { SafeListing, SafeUser } from '@/types'

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
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
