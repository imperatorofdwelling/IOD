import { NextResponse, NextRequest } from 'next/server'
import admin from 'firebase-admin'
import { useAuth } from '@/context/AuthContext'

// Инициализация Firebase Admin SDK, если она еще не была выполнена
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || ''
  )
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://imperator-of-dwelling.firebaseapp.com',
  })
}

// Экспорт обработчика запроса
export async function GET(req: NextRequest) {
  try {
    const { user } = useAuth()
    const body = await req.json()
    const { uid } = body

    const userRecord = await admin.auth().getUser(uid)

    const userProfile = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    }

    return new Response(JSON.stringify({ status: 200, userProfile }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Не удалось получить профиль:', error)
    return new Response(
      JSON.stringify({ error: 'Внутренняя ошибка сервера' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
