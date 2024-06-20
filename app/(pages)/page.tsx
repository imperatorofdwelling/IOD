import getCurrentUser from '../actions/getCurrentUser'
import getListings from '../actions/getListings'
import ClientOnly from 'shared/ui/ClientOnly'
import Container from 'shared/ui/Container'
import EmptyState from 'shared/ui/EmptyState'
import ListingCard from 'shared/ui/listings/ListingCard'

async function Home() {
  const ligstings = await getListings()
  const currentUser = await getCurrentUser()

  if (ligstings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
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
    </ClientOnly>
  )
}

export default Home
