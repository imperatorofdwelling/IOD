import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import { getCurrentUser } from 'shared/services/server-actions'

interface IParams {
    reservationId?: string
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }

    const { reservationId } = params
    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Неправильный Id')
    }
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } },
            ],
        },
    })

    return NextResponse.json(reservation)
}
