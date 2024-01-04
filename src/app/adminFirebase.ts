import {
  AppOptions,
  cert,
  getApp,
  getApps,
  initializeApp,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

const options: AppOptions = {
  credential: cert(serviceAccount),
  databaseURL: process.env.databaseURL,
}

function createFirebaseAdminApp(config: AppOptions) {
  if (getApps().length === 0) {
    return initializeApp(config)
  } else {
    return getApp()
  }
}

const firebaseAdmin = createFirebaseAdminApp(options)

export const adminFirestore = getFirestore(firebaseAdmin)
