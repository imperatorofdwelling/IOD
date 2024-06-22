'use server'
import prisma from '@/libs/prismadb'

interface IParams {
    apartmentId?: string
    userId?: string
    authorId?: string
}

export const getReservations = async (params: IParams) => {
    try {
        const { apartmentId, userId, authorId } = params

        const query: any = {}

        if (apartmentId) {
            query.listingId = apartmentId
        }

        if (userId) {
            query.userId = userId
        }

        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        const safeReservation = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
            },
        }))

        return safeReservation
    } catch (error: any) {
        throw new Error(error.message)
    }
}
