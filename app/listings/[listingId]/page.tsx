import getCurrentUser from '@/actions/getCurrentUser'
import getListingById from '@/actions/getListingById'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import ListingClient from '@/listings/[listingId]/ListingClient'
interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient currentUser={currentUser} listing={listing} />
    </ClientOnly>
  )
}

export default ListingPage
