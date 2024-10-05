import Header from '@/components/layout/Header/Header'
import NextAuthProvider from '@/lib/NextAuth/NextAuthProvider'
import SesstionChecker from '@/lib/NextAuth/SesstionChecker'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ENTRIX',
  description: '企業のエントリー管理を効率化',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="jp">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="icon" href="/file.png" type="image/<generated>" sizes="<generated>" />
      </head>
      <body className={inter.className}>
        <Header />
        <NextAuthProvider>
          <SesstionChecker>{children}</SesstionChecker>
        </NextAuthProvider>
      </body>
    </html>
  )
}
