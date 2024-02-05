import prisma from '@libs/prismadb'

export interface IListings {
    userId?: string
}

export default async function getListings(params: IListings) {
    try {
        const { userId } = params
        let query: any = {}
        if (userId) {
            query.userId = userId
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