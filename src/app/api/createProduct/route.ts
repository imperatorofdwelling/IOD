import admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, address } = req.body

      if (!name || !address) {
        return res.status(400).json({ error: 'Имя и адрес обязательны' })
      }

      const db = admin.firestore()
      const cardsCollection = db.collection('cards')

      const newCardRef = await cardsCollection.add({ name, address })

      return res.status(200).json({ success: true, id: newCardRef.id })
    } catch (error) {
      console.error('Ошибка при добавлении карточки:', error)
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
    }
  }

  return res.status(405).json({ error: 'Метод не разрешен' })
}
