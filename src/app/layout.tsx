import Header from '@/components/layout/Header/Header'
import NextAuthProvider from '@/lib/NextAuth/NextAuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AnalysisContextProvider } from './state/context/useAnalysisData'
import { PostContextProvider } from './state/context/usePost'
import { UserContextPorvider } from './state/context/useUser'

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
        <NextAuthProvider>
          <PostContextProvider>
            <AnalysisContextProvider>
              <UserContextPorvider>
                <Header />
                {children}
              </UserContextPorvider>
            </AnalysisContextProvider>
          </PostContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
