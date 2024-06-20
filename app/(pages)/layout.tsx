import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import '../styles/globals.css'
import Navbar from 'shared/ui/navbar/Navbar'
import ClientOnly from 'shared/ui/ClientOnly'
import RegisterModal from 'shared/ui/modals/RegisterModal'
import ToasterProvider from '../providers/ToasterProvider'
import LoginModal from 'shared/ui/modals/LoginModal'
import getCurrentUser from '../actions/getCurrentUser'
import RentModal from 'shared/ui/modals/RentModal'
import SearchModal from 'shared/ui/modals/SearchModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Imperator Of Dwelling',
  description: 'Booking application',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <RentModal />
          <LoginModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
