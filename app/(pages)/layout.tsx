import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import '../styles/globals.css'
import '../styles/root.css'
import RegisterModal from 'shared/ui/modals/RegisterModal'
import ToasterProvider from '../providers/ToasterProvider'
import LoginModal from 'shared/ui/modals/LoginModal'
import RentModal from 'shared/ui/modals/RentModal'
import SearchModal from 'shared/ui/modals/SearchModal'
import { TanStackQueryProvider } from '@/providers/TanStackQueryProvider'
import { YandexMapProvider } from '@/providers/YandexMapProvider'
import { ILayout } from 'shared/types'
import { Suspense } from '@/shared/ui/Suspense'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Imperator Of Dwelling',
    description: 'Booking application',
}

const RootLayout = ({ children }: ILayout) => {
    return (
        <html lang="en">
            <body className={`${font.className} dark`}>
                <Suspense>
                    <TanStackQueryProvider>
                        <YandexMapProvider>
                            <ToasterProvider />
                            <RegisterModal />
                            <RentModal />
                            <LoginModal />
                            <SearchModal />
                            {children}
                        </YandexMapProvider>
                    </TanStackQueryProvider>
                </Suspense>
            </body>
        </html>
    )
}
export default RootLayout
