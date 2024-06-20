import prisma from '@/libs/prismadb' // Убедитесь, что путь к файлу prismadb корректен

export async function getListingsUserId(userId: string) {
  // Предполагаем, что у модели Listing есть поле userId для связи с пользователем
  const listings = await prisma.listing.findMany({
    where: {
      userId: userId,
    },
    // Дополнительно можно добавить сортировку или выборку определенных полей
    orderBy: {
      createdAt: 'desc',
    },
  })

  return listings
}
