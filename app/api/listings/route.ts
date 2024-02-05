
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser';


export async function POST(req: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ success: false, message: 'User not found' })
    }

    const body = await req.json()
    const { title, description, imageSrc, roomCount, bathroomCount, guestCount, location, price } = body
    Object.keys(body).forEach((value: string) => {
        if (!body[value]) {
            NextResponse.error()
        }
    })
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)


}