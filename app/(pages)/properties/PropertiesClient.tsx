'use client'

import Container from 'shared/ui/Container'
import Heading from 'shared/ui/Heading'
import ListingCard from 'shared/ui/listings/ListingCard'
import { SafeUser } from '@/types'
import { type FC } from 'react'
import {
    useGetUserListingsById,
    useMutationDeleteApartamentById,
} from 'shared/services/hooks'
import Loader from '../loading'
import EmptyState from 'shared/ui/EmptyState'

interface IPropertiesClient {
    currentUser?: SafeUser | null
}

const PropertiesClient: FC<IPropertiesClient> = ({ currentUser }) => {
    const { data: listings, isLoading } = useGetUserListingsById(
        currentUser?.id || ''
    )

    const { mutate, isPending } = useMutationDeleteApartamentById()

    if (isLoading) {
        return <Loader />
    }

    if (!listings?.length && !isLoading) {
        return <EmptyState title="Нет квартир" />
    }

    return (
        <Container>
            <Heading title="Объявления" subtitle="Мои объявления" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gris-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings?.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        onAction={() => mutate(listing.id)}
                        disabled={isPending}
                        actionLabel="Удалить"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient
