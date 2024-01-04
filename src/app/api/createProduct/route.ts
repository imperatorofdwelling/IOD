import { NextRequest, NextResponse } from 'next/server'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firebaseApp } from '@/app/firebase'

export async function POST(req: NextRequest) {
  const { method, body } = req

  if (method === 'POST') {
    try {
      const db = getFirestore(firebaseApp)
      const cardsCollection = collection(db, 'cards')

      if (!body) {
        return NextResponse.json(
          { error: 'Тело запроса отсутствует' },
          { status: 400 }
        )
      }

      const { name, address } = await req.json()

      const newCardRef = await addDoc(cardsCollection, { name, address })

      return NextResponse.json({ success: true, id: newCardRef.id })
    } catch (error) {
      console.error('Ошибка при добавлении карточки:', error)
      return NextResponse.json(
        { error: 'Внутренняя ошибка сервера' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ error: 'Метод не разрешен' }, { status: 405 })
}
