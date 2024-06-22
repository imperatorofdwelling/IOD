'use server'
import prisma from '@/libs/prismadb'

export const getDetailApartmentById = async (listingId?: string) => {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        })
        if (!listing) return null

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified:
                    listing.user.emailVerified?.toISOString() || null,
            },
        }
    } catch (error: any) {
        console.log('Ошибка в getDetailApartmentById')
        console.log(typeof error?.message === 'string' && error?.message)
        return null
    }
}
