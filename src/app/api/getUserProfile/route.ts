import { adminTest } from '@/app/firebase'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { uid } = await req.json()
    if (!uid) {
      return NextResponse.json({
        status: 400,
        error: 'UID не найден',
      })
    }
    const userRecord = await adminTest.getUser(uid)

    const userProfile = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    }
    return NextResponse.json({ status: 200, userProfile })
  } catch (error) {
    console.error('Не удалось получить профиль:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
