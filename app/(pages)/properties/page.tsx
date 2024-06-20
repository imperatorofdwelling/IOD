import EmptyState from 'shared/ui/EmptyState'
import ClientOnly from 'shared/ui/ClientOnly'
import getCurrentUser from '@/actions/getCurrentUser'
import PropertiesClient from './PropertiesClient'
import { getListingsUserId } from '@/actions/getListingsUserId'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Не авторизован" subtitle="Пожалуйста войдите" />
      </ClientOnly>
    )
  }

  const listings = await getListingsUserId(currentUser.id)

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="Нет  квартир" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
