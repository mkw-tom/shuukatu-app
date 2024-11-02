import Header from '@/components/layout/Header/Header'
import NextAuthProvider from '@/lib/NextAuth/NextAuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import './globals.css'
import { AnalysisContextProvider } from './state/context/useAnalysisData'
import { PostContextProvider } from './state/context/usePost'
import { UserContextPorvider } from './state/context/useUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Entrix',
  description: '就活のエントリー管理を効率化',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="jp">
      <Head>
        <title>Entrix</title>
        <meta
          name="description"
          content="「Entrix」は就活エントリー管理アプリです。あなたの就活のエントリー情報管理や選考状況のチャート化、AI適職診断を体験することができます。"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Entrix" />
        <meta property="og:description" content="「Entrix」は就活エントリー管理アプリです。" />
        <meta property="og:image" content="/file.png" />
        <meta property="og:url" content="https://yourwebsite.com" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Entrix" />
        <meta name="twitter:description" content="「Entrix」は就活エントリー管理アプリです。" />
        <meta name="twitter:image" content="/file.png" />

        {/* Favicon */}
        <link rel="icon" href="/file.png" type="image/png" sizes="32x32" />

        {/* Fonts */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
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
