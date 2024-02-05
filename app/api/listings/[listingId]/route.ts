
import { NextResponse } from 'next/server';
import prisma from '@libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser';

interface IParams {
    listingId?: string
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error
    }

    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Неправильный ID')
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })
    return NextResponse.json(listing)


}