import { gu } from 'date-fns/locale';
import prisma from '@libs/prismadb'

export interface IListings {
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    startDate?: string
    endDate?: string
    locationValue?: string
}

export default async function getListings(params: IListings) {
    try {
        const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue } = params
        let query: any = {}
        if (userId) {
            query.userId = userId
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }
        if (locationValue) {
            query.locationValue = locationValue
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: endDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: startDate }
                            }
                        ]
                    }
                }
            }
        }
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        const saveListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return saveListings

    } catch (error: any) {
        throw new Error(error.message)
    }
}