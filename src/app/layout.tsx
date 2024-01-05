'use client'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import { metadata } from './metaData'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
          <SpeedInsights />
        </AuthContextProvider>
      </body>
    </html>
  )
}
