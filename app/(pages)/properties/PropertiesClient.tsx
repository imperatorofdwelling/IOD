'use client'

import Container from 'shared/ui/Container'
import Heading from 'shared/ui/Heading'
import ListingCard from 'shared/ui/listings/ListingCard'
import { SafeListing, SafeUser } from '@/types'
import { Listing } from '@prisma/client'
import { $axios } from 'shared/axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState, type FC } from 'react'
import toast from 'react-hot-toast'

interface IPropertiesClient {
    listings: Listing[]
    currentUser?: SafeUser | null
}

const PropertiesClient: FC<IPropertiesClient> = ({ listings, currentUser }) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id)

            $axios
                .delete(`listings/${id}`)
                .then(() => {
                    toast.success('Успешно удалено')
                    router.refresh()
                })
                .catch((error) => {
                    toast.error('Не удалось удалить объявление')
                })
                .finally(() => {
                    setDeletingId('')
                })
        },
        [router]
    )
    return (
        <Container>
            <Heading title="Объявления" subtitle="Мои объявления" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gris-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        onAction={() => onCancel(listing.id)}
                        disabled={deletingId === listing.id}
                        actionLabel="Удалить"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient
