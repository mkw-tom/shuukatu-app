import Header from '@/components/layout/Header/Header'
import NextAuthProvider from '@/lib/NextAuth/NextAuthProvider'
import { Inter } from 'next/font/google'
import './globals.css'
import { AnalysisContextProvider } from './state/context/useAnalysisData'
import { PostContextProvider } from './state/context/usePost'
import { UserContextPorvider } from './state/context/useUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Entrix',
  description:
    '「Entrix」は就活エントリー管理アプリです。あなたの就活のエントリー情報管理や選考状況のチャート化、AI適職診断を体験することができます。',
  openGraph: {
    title: 'Entrix',
    description: '「Entrix」は就活エントリー管理アプリです。',
    url: 'https://yourwebsite.com',
    images: [
      {
        url: '/file.png',
        width: 800,
        height: 600,
        alt: 'Entrixのロゴ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entrix',
    description: '「Entrix」は就活エントリー管理アプリです。',
    images: ['/file.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
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
