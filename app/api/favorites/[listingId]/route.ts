import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from '@libs/prismadb'

interface IParams {
    listingId?: string
}

export async function POST(req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.json({ success: false, message: 'User not found' })
    }

    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Неверный Id')
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]
    favoriteIds.push(listingId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.json({ success: false, message: 'User not found' })
    }

    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Неверный Id')
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]
    favoriteIds = favoriteIds.filter((id) => id !== listingId)

    const user = prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })
    return NextResponse.json(user)
}